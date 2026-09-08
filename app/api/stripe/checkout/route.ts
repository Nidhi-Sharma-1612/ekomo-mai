import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSiteUrl } from "@/lib/site";
import { getPropertyBySlug } from "@/lib/hostaway/getProperties";
import { fetchCalendar } from "@/lib/hostaway/client";
import { calculateTotal } from "@/lib/pricing";

function nightsBetween(checkIn: string, checkOut: string): number {
  const start = new Date(`${checkIn}T00:00:00Z`);
  const end = new Date(`${checkOut}T00:00:00Z`);
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

/**
 * Creates a Stripe Checkout Session for a booking. Runs server-side so the
 * charged amount always comes from a fresh Hostaway price lookup — never a
 * client-supplied number.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const slug = typeof body?.slug === "string" ? body.slug : undefined;
  const checkIn = typeof body?.checkIn === "string" ? body.checkIn : undefined;
  const checkOut = typeof body?.checkOut === "string" ? body.checkOut : undefined;
  const guests = typeof body?.guests === "number" ? body.guests : undefined;

  if (!slug || !checkIn || !checkOut || !guests) {
    return NextResponse.json(
      { error: "slug, checkIn, checkOut, and guests are required." },
      { status: 400 }
    );
  }

  const nights = nightsBetween(checkIn, checkOut);
  if (nights < 1) {
    return NextResponse.json({ error: "checkOut must be after checkIn." }, { status: 400 });
  }

  const property = await getPropertyBySlug(slug);
  if (!property) {
    return NextResponse.json({ error: "Property not found." }, { status: 404 });
  }

  if (guests > property.maxGuests) {
    return NextResponse.json(
      { error: `This property sleeps a maximum of ${property.maxGuests} guests.` },
      { status: 400 }
    );
  }

  let nightlySubtotal: number;

  if (property.hostawayListingId) {
    let days;
    try {
      days = await fetchCalendar(property.hostawayListingId, checkIn, checkOut);
    } catch {
      return NextResponse.json(
        { error: "Couldn't verify live availability. Please try again." },
        { status: 502 }
      );
    }

    const nightsInRange = days.filter((d) => d.date < checkOut);
    const stillAvailable =
      nightsInRange.length > 0 &&
      nightsInRange.every((d) => Boolean(d.isAvailable) && d.status === "available");

    if (!stillAvailable) {
      return NextResponse.json(
        { error: "Sorry, these dates are no longer available." },
        { status: 409 }
      );
    }

    const minStay = days.find((d) => d.date === checkIn)?.minimumStay ?? 1;
    if (nights < minStay) {
      return NextResponse.json(
        { error: `This property requires a minimum stay of ${minStay} nights for that check-in date.` },
        { status: 400 }
      );
    }

    nightlySubtotal = nightsInRange.reduce((sum, d) => sum + d.price, 0);
  } else if (property.nightlyRateFrom) {
    nightlySubtotal = property.nightlyRateFrom * nights;
  } else {
    return NextResponse.json(
      { error: "Rates for this property are available on inquiry — please contact us to book." },
      { status: 400 }
    );
  }

  const breakdown = calculateTotal(property, nightlySubtotal, nights, guests);

  const siteUrl = getSiteUrl();
  const coverImage = property.images[0]?.src;
  const imageUrl = typeof coverImage === "string" && coverImage.startsWith("http") ? coverImage : undefined;

  const searchQuery = new URLSearchParams({ checkIn, checkOut, guests: String(guests) }).toString();

  const lineItem = (name: string, amount: number, description?: string, images?: string[]) => ({
    price_data: {
      currency: "usd",
      unit_amount: Math.round(amount * 100),
      product_data: { name, description, images },
    },
    quantity: 1,
  });

  const lineItems = [
    lineItem(
      property.name,
      breakdown.nightlySubtotal,
      `${nights} night${nights > 1 ? "s" : ""} · ${checkIn} to ${checkOut}, ${guests} guest${guests > 1 ? "s" : ""}`,
      imageUrl ? [imageUrl] : undefined
    ),
  ];
  if (breakdown.cleaningFee > 0) lineItems.push(lineItem("Cleaning fee", breakdown.cleaningFee));
  if (breakdown.checkinFee > 0) lineItems.push(lineItem("Check-in fee", breakdown.checkinFee));
  if (breakdown.tax > 0) lineItems.push(lineItem("Taxes", breakdown.tax));

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      // Collects the guest's name, email, and phone on Stripe's hosted page —
      // needed to create the actual Hostaway reservation after payment.
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      metadata: {
        propertySlug: slug,
        propertyName: property.name,
        checkIn,
        checkOut,
        guests: String(guests),
        nights: String(nights),
      },
      success_url: `${siteUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/properties/${slug}?${searchQuery}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Couldn't start checkout." },
      { status: 502 }
    );
  }
}
