import "server-only";

const BASE_URL = "https://api.hostaway.com/v1";

/**
 * In-memory token cache. Hostaway tokens are valid ~24 months, so a simple
 * module-level cache (persists across warm serverless invocations, refetched
 * on cold start) avoids re-authenticating on every request.
 */
let cachedToken: { value: string; expiresAt: number } | null = null;

function getCredentials() {
  const accountId = process.env.HOSTAWAY_ACCOUNT_ID;
  const clientSecret = process.env.HOSTAWAY_CLIENT_SECRET;

  if (!accountId || !clientSecret) {
    throw new Error(
      "Missing HOSTAWAY_ACCOUNT_ID / HOSTAWAY_CLIENT_SECRET environment variables. Add them to .env.local."
    );
  }

  return { accountId, clientSecret };
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const { accountId, clientSecret } = getCredentials();

  const res = await fetch(`${BASE_URL}/accessTokens`, {
    method: "POST",
    // No explicit cache mode: the in-memory cachedToken check above already
    // prevents redundant calls, so this rarely runs — letting it use Next's
    // default caching avoids forcing every Hostaway-touching page dynamic.
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: accountId,
      client_secret: clientSecret,
      scope: "general",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Hostaway auth failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  // expires_in is in seconds; refresh a day early to be safe.
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60 * 60 * 24) * 1000,
  };

  return cachedToken.value;
}

async function hostawayFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await getAccessToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    // Defaults to Next.js's normal fetch caching (revalidated per call-site
    // below); callers needing always-fresh data (availability/pricing) pass
    // cache: "no-store" explicitly.
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Hostaway request failed (${res.status}) for ${path}: ${text}`);
  }

  const json = await res.json();
  // Hostaway wraps responses as { status: "success", result: ... }
  return json.result as T;
}

export interface HostawayListingSummary {
  id: number;
  [key: string]: unknown;
}

export function fetchListings(params?: Record<string, string | number>) {
  const query = params
    ? "?" + new URLSearchParams(params as Record<string, string>).toString()
    : "";
  return hostawayFetch<HostawayListingSummary[]>(`/listings${query}`, {
    next: { revalidate: 3600 },
  });
}

export function fetchListing(id: number | string) {
  return hostawayFetch<Record<string, unknown>>(`/listings/${id}?includeResources=1`, {
    next: { revalidate: 3600 },
  });
}

export interface HostawayCalendarDay {
  date: string;
  status: "available" | "unavailable" | string;
  price: number;
  minimumStay?: number;
  [key: string]: unknown;
}

export function fetchCalendar(id: number | string, startDate: string, endDate: string) {
  const query = new URLSearchParams({ startDate, endDate }).toString();
  return hostawayFetch<HostawayCalendarDay[]>(`/listings/${id}/calendar?${query}`, {
    cache: "no-store",
  });
}

/**
 * Same endpoint as fetchCalendar, but cacheable — for display-only pricing
 * (e.g. a listing card's "from $X/night") where booking-critical freshness
 * doesn't matter and forcing every page that shows a price into fully
 * dynamic rendering would be wasteful.
 */
export function fetchCalendarCached(id: number | string, startDate: string, endDate: string) {
  const query = new URLSearchParams({ startDate, endDate }).toString();
  return hostawayFetch<HostawayCalendarDay[]>(`/listings/${id}/calendar?${query}`, {
    next: { revalidate: 3600 },
  });
}

export function fetchPriceDetails(
  id: number | string,
  payload: { arrivalDate: string; departureDate: string; numberOfGuests?: number }
) {
  return hostawayFetch<Record<string, unknown>>(`/listings/${id}/calendar/priceDetails`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(payload),
  });
}

export interface HostawayReservation {
  id: number;
  listingMapId: number;
  channelId: number;
  arrivalDate: string;
  departureDate: string;
  guestName: string;
  status: string;
  comment: string | null;
  [key: string]: unknown;
}

export interface CreateReservationPayload {
  listingMapId: number;
  channelId: number;
  arrivalDate: string;
  departureDate: string;
  guestFirstName: string;
  guestLastName: string;
  guestEmail?: string;
  phone?: string;
  numberOfGuests: number;
  adults: number;
  totalPrice: number;
  currency: string;
  status: string;
  comment?: string;
}

/** Creates a real reservation that blocks the listing's calendar. Never cached. */
export function createReservation(payload: CreateReservationPayload) {
  return hostawayFetch<HostawayReservation>(`/reservations`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(payload),
  });
}

export function fetchReservations(params: Record<string, string | number>) {
  const query = "?" + new URLSearchParams(params as Record<string, string>).toString();
  return hostawayFetch<HostawayReservation[]>(`/reservations${query}`, {
    cache: "no-store",
  });
}

export interface HostawayReview {
  id: number;
  listingMapId: number;
  reviewerName: string | null;
  guestName: string | null;
  status: "expired" | "pending" | "awaiting" | "published" | string;
  rating: number | null;
  publicReview: string | null;
  isHidden: number;
  submittedAt: string | null;
  [key: string]: unknown;
}

export function fetchReviews(params?: Record<string, string | number>) {
  const query = params
    ? "?" + new URLSearchParams(params as Record<string, string>).toString()
    : "";
  return hostawayFetch<HostawayReview[]>(`/reviews${query}`, {
    next: { revalidate: 3600 },
  });
}

export interface HostawayCancellationPolicyItem {
  refundAmount: number;
  refundType: "percentage" | string;
  /** Seconds relative to the event (negative = before), e.g. -5184000 = 60 days before arrival. */
  timeDelta: number;
  event: "arrival" | string;
}

export interface HostawayCancellationPolicy {
  id: number;
  name: string;
  cancellationPolicyItem: HostawayCancellationPolicyItem[];
}

/** The account's named cancellation policies (Firm, Moderate, etc.) — a listing references one by id. */
export function fetchCancellationPolicies() {
  return hostawayFetch<HostawayCancellationPolicy[]>(`/cancellationPolicies`, {
    next: { revalidate: 3600 },
  });
}
