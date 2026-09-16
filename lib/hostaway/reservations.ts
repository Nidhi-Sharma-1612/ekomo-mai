import "server-only";
import { createReservation, fetchReservations } from "@/lib/hostaway/client";

/** Hostaway's channel id for reservations created directly via the public API (not their own booking-engine product). */
const DIRECT_CHANNEL_ID = 2000;

export interface GuestDetails {
  name: string;
  email?: string;
  phone?: string;
}

/**
 * Creates the actual Hostaway reservation for a paid Stripe booking, blocking
 * the calendar. Idempotent by Stripe session id (stashed in the reservation
 * comment) — safe to call more than once for the same session, e.g. if a
 * guest reloads the success page, without double-booking the same dates.
 */
export async function ensureReservationCreated({
  hostawayListingId,
  checkIn,
  checkOut,
  guests,
  totalPrice,
  guest,
  stripeSessionId,
}: {
  hostawayListingId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  guest: GuestDetails;
  stripeSessionId: string;
}): Promise<{ created: boolean; reservationId?: number }> {
  const existing = await fetchReservations({
    listingMapId: hostawayListingId,
    arrivalStartDate: checkIn,
    arrivalEndDate: checkIn,
  });
  const alreadyExists = existing.find((r) => r.comment?.includes(stripeSessionId));
  if (alreadyExists) {
    return { created: false, reservationId: alreadyExists.id };
  }

  const [guestFirstName, ...rest] = guest.name.trim().split(/\s+/);
  const guestLastName = rest.join(" ") || "Guest";

  const reservation = await createReservation({
    listingMapId: hostawayListingId,
    channelId: DIRECT_CHANNEL_ID,
    arrivalDate: checkIn,
    departureDate: checkOut,
    guestFirstName: guestFirstName || "Guest",
    guestLastName,
    guestEmail: guest.email,
    phone: guest.phone,
    numberOfGuests: guests,
    adults: guests,
    totalPrice,
    currency: "USD",
    status: "new",
    comment: `Booked via lahainaoceanfrontrentals.com direct-booking site — Stripe session ${stripeSessionId}`,
  });

  return { created: true, reservationId: reservation.id };
}
