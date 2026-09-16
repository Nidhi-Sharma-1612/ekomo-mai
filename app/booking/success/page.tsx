import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { getStripe } from "@/lib/stripe";
import { formatDisplayDate, parseISODate } from "@/lib/date";
import { getPropertyBySlug } from "@/lib/hostaway/getProperties";
import { ensureReservationCreated } from "@/lib/hostaway/reservations";

export const metadata: Metadata = {
  title: "Booking Confirmation | LahainaOceanfrontRentals",
};

export default async function BookingSuccessPage(props: PageProps<"/booking/success">) {
  const searchParams = await props.searchParams;
  const sessionId = typeof searchParams.session_id === "string" ? searchParams.session_id : undefined;

  if (!sessionId) notFound();

  const stripe = getStripe();

  let paid = false;
  let propertyName: string | undefined;
  let checkIn: Date | null = null;
  let checkOut: Date | null = null;
  let guests: string | undefined;
  let amount: number | null = null;
  /** "auto" = a real Hostaway reservation now blocks these dates. "manual" = we'll need to confirm by hand (static property, or the Hostaway call failed). */
  let reservationOutcome: "auto" | "manual" = "manual";

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    paid = session.payment_status === "paid";
    propertyName = session.metadata?.propertyName;
    checkIn = session.metadata?.checkIn ? parseISODate(session.metadata.checkIn) : null;
    checkOut = session.metadata?.checkOut ? parseISODate(session.metadata.checkOut) : null;
    guests = session.metadata?.guests;
    amount = session.amount_total != null ? session.amount_total / 100 : null;

    if (paid && session.metadata?.propertySlug && session.metadata.checkIn && session.metadata.checkOut) {
      const property = await getPropertyBySlug(session.metadata.propertySlug);
      if (property?.hostawayListingId && amount !== null) {
        try {
          await ensureReservationCreated({
            hostawayListingId: property.hostawayListingId,
            checkIn: session.metadata.checkIn,
            checkOut: session.metadata.checkOut,
            guests: Number(session.metadata.guests ?? 1),
            totalPrice: amount,
            guest: {
              name: session.customer_details?.name ?? "Guest",
              email: session.customer_details?.email ?? undefined,
              phone: session.customer_details?.phone ?? undefined,
            },
            stripeSessionId: sessionId,
          });
          reservationOutcome = "auto";
        } catch (error) {
          console.error("Failed to create Hostaway reservation for paid session", sessionId, error);
        }
      }
    }
  } catch {
    notFound();
  }

  return (
    <section className="flex min-h-[65vh] items-center py-24">
      <div className="mx-auto max-w-xl px-6 text-center">
        <span
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
            paid ? "bg-palm/10 text-palm" : "bg-red-100 text-red-500"
          }`}
        >
          {paid ? <CheckCircle2 size={36} strokeWidth={1.5} /> : <XCircle size={36} strokeWidth={1.5} />}
        </span>

        {paid ? (
          <>
            <h1 className="mt-6 font-serif text-3xl text-ink">
              {reservationOutcome === "auto" ? "Booking confirmed!" : "Payment received!"}
            </h1>
            <p className="mt-3 text-ink/70">
              {propertyName ? `Your stay at ${propertyName}` : "Your stay"}
              {checkIn && checkOut && (
                <>
                  {" "}
                  for {formatDisplayDate(checkIn)} &ndash; {formatDisplayDate(checkOut)}
                </>
              )}
              {guests ? `, ${guests} guest${Number(guests) > 1 ? "s" : ""}` : ""}
              {reservationOutcome === "auto"
                ? " is booked and your dates are reserved. We can't wait to welcome you."
                : " is being finalized on our end — we'll confirm your exact dates by email within 24 hours."}
            </p>
            {amount !== null && (
              <p className="mt-5 font-serif text-3xl text-ink">
                ${amount.toFixed(2)} <span className="text-sm font-sans font-normal text-ink/50">paid</span>
              </p>
            )}
          </>
        ) : (
          <>
            <h1 className="mt-6 font-serif text-3xl text-ink">Payment not completed</h1>
            <p className="mt-3 text-ink/70">
              We couldn&apos;t confirm this payment. If you believe you were charged, please contact us and
              we&apos;ll sort it out right away.
            </p>
          </>
        )}

        <Link
          href="/properties"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ocean-deep"
        >
          Browse more properties
        </Link>
      </div>
    </section>
  );
}
