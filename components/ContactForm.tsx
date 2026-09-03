"use client";

import { useState, type FormEvent } from "react";
import { Calendar, Mail, MessageSquare, User } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No backend wired up yet — swap this for a real submit handler
    // (API route, server action, or email service) when ready to go live.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-palm/10 p-8 text-center">
        <p className="font-serif text-xl text-palm-deep">Mahalo for reaching out!</p>
        <p className="mt-2 text-sm text-ink/70">
          We typically respond within the hour. In the meantime, feel free to
          email us directly at{" "}
          <a href="mailto:pahiatrinh@gmail.com" className="font-semibold text-ocean">
            pahiatrinh@gmail.com
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

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-ocean px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ocean-deep"
      >
        Send Message
      </button>
    </form>
  );
}
