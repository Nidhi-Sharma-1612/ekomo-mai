"use client";

import { useState, type FormEvent } from "react";
import { Building2, Calendar, Mail, MessageSquare, User } from "lucide-react";

export default function ContactForm({
  email,
  propertyNames,
}: {
  email: string;
  propertyNames: string[];
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          property: data.get("property"),
          dates: data.get("dates"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-palm/10 p-8 text-center">
        <p className="font-serif text-xl text-palm-deep">Mahalo for reaching out!</p>
        <p className="mt-2 text-sm text-ink/70">
          We typically respond within the hour. In the meantime, feel free to
          email us directly at{" "}
          <a href={`mailto:${email}`} className="font-semibold text-ocean">
            {email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="flex items-center gap-1.5 text-sm font-medium text-ink/80">
            <User size={15} strokeWidth={1.75} className="text-ocean" />
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ocean focus:ring-1 focus:ring-ocean"
          />
        </div>
        <div>
          <label htmlFor="email" className="flex items-center gap-1.5 text-sm font-medium text-ink/80">
            <Mail size={15} strokeWidth={1.75} className="text-ocean" />
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ocean focus:ring-1 focus:ring-ocean"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="property" className="flex items-center gap-1.5 text-sm font-medium text-ink/80">
            <Building2 size={15} strokeWidth={1.75} className="text-ocean" />
            Property (optional)
          </label>
          <select
            id="property"
            name="property"
            defaultValue=""
            className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ocean focus:ring-1 focus:ring-ocean"
          >
            <option value="">Not sure / general question</option>
            {propertyNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dates" className="flex items-center gap-1.5 text-sm font-medium text-ink/80">
            <Calendar size={15} strokeWidth={1.75} className="text-ocean" />
            Preferred dates (optional)
          </label>
          <input
            id="dates"
            name="dates"
            type="text"
            placeholder="e.g. March 12 – March 19"
            className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ocean focus:ring-1 focus:ring-ocean"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="flex items-center gap-1.5 text-sm font-medium text-ink/80">
          <MessageSquare size={15} strokeWidth={1.75} className="text-ocean" />
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ocean focus:ring-1 focus:ring-ocean"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center rounded-full bg-ocean px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ocean-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
