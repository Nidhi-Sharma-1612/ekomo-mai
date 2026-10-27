// Fetches editable marketing copy (hero text, FAQs, settings, etc.) from the
// Design by Dial admin panel. Every call has a hardcoded fallback in the
// calling component, so the live site keeps working even if the admin panel
// or its database is unreachable.
//
// Cached for a short window rather than fetched per request: an uncached CMS
// call forced every page to render on demand and wait on the admin panel
// before sending any HTML. A 60s revalidate keeps pages fast while a client's
// edit in the admin panel still goes live within about a minute.
const CMS_REVALIDATE_SECONDS = 60;
const CMS_URL = process.env.ADMIN_PANEL_API_URL;
const CMS_API_KEY = process.env.ADMIN_PANEL_API_KEY;
const CMS_SITE_SLUG = "louise";

async function cmsFetch<T>(path: string): Promise<T | null> {
  if (!CMS_URL || !CMS_API_KEY) return null;

  try {
    const res = await fetch(`${CMS_URL}/api/public/${CMS_SITE_SLUG}${path}`, {
      headers: { "x-api-key": CMS_API_KEY },
      next: { revalidate: CMS_REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getPageSections(
  pageSlug: string,
): Promise<Record<string, Record<string, unknown>>> {
  const data = await cmsFetch<{ sections: Record<string, Record<string, unknown>> }>(
    `/pages/${pageSlug}`,
  );
  return data?.sections ?? {};
}

export async function getCmsFaqs(): Promise<{ question: string; answer: string }[] | null> {
  const data = await cmsFetch<{ faqs: { question: string; answer: string }[] }>("/faqs");
  return data?.faqs ?? null;
}

export type CmsSettings = {
  siteName?: string;
  logoUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  footerTagline?: string;
  copyrightName?: string;
  socialLinks?: Record<string, string>;
};

export async function getSiteSettings(): Promise<CmsSettings | null> {
  const data = await cmsFetch<{ settings: CmsSettings | null }>("/settings");
  return data?.settings ?? null;
}

// next/image can only resize hosts allowed in next.config.mjs (local files and
// this CMS's media). Any other URL an editor pastes in is passed through as-is
// via `unoptimized` rather than crashing the page.
export function isOptimizableImage(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    return !!CMS_URL && new URL(src).host === new URL(CMS_URL).host;
  } catch {
    return false;
  }
}

// Small helper for reading a single string field off a section's content
// with a fallback — most call sites just want "this string, or a default".
export function str(
  section: Record<string, unknown>,
  key: string,
  fallback: string,
): string {
  const value = section[key];
  return typeof value === "string" && value ? value : fallback;
}
