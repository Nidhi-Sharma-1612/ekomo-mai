import { NextResponse } from "next/server";
import { sendContactInquiry } from "@/lib/mail";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const property = typeof body?.property === "string" ? body.property.trim() : undefined;
  const dates = typeof body?.dates === "string" ? body.dates.trim() : undefined;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  try {
    await sendContactInquiry({ name, email, property, dates, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact inquiry", error);
    return NextResponse.json(
      { error: "Couldn't send your message right now. Please try emailing us directly." },
      { status: 502 }
    );
  }
}
