import { allowedRules, notAllowedRules } from "@/lib/data/policies";
import {
  CheckIcon,
  CrossIcon,
  HeartIcon,
  PolicyIcon,
  RulesIcon,
  SmallClockIcon,
} from "@/components/PropertyIcons";
import type { Property } from "@/lib/types";

const tierAccents: Record<string, string> = {
  "Full refund": "bg-palm",
  "50% refund": "bg-gold",
  "No refund": "bg-ink/30",
};

/**
 * Sentences in the host's text that are guest-message boilerplate (copied from
 * Hostaway booking confirmations) or already shown elsewhere on the page —
 * the check-in/out tiles, and the single "ask ahead" note under the extras.
 */
const SKIPPED_SENTENCES = [
  /^thank you for reserving/i,
  /additional emails/i,
  /use our address/i,
  /^check[- ]?in time is/i,
  /^please inquire before your stay/i,
  /^thank you\b/i,
];

interface ParsedHouseRules {
  restrictions: string[];
  extras: string[];
  notes: string;
}

/**
 * Hostaway's houseRules field is one free-text blob mixing actual rules, paid
 * extras, and friendly notes — sorted here so each gets the right treatment
 * instead of every sentence being shown as a prohibition.
 */
function parseHouseRules(text: string): ParsedHouseRules {
  const sentences = text
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=[.!?])\s+/))
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => !SKIPPED_SENTENCES.some((pattern) => pattern.test(s)));

  const restrictions: string[] = [];
  const extras: string[] = [];
  const notes: string[] = [];

  for (const sentence of sentences) {
    if (/^no\s/i.test(sentence)) {
      // "No smoking, no animals." -> ["No smoking", "No animals"]
      for (const part of sentence.replace(/\.$/, "").split(/,\s*(?=no\s)/i)) {
        restrictions.push(part.charAt(0).toUpperCase() + part.slice(1));
      }
    } else if (/early check|late check/i.test(sentence)) {
      extras.push(sentence);
    } else {
      notes.push(sentence);
    }
  }

  return { restrictions, extras, notes: notes.join(" ") };
}

export default function GoodToKnow({ property }: { property: Property }) {
  const parsed = property.houseRulesText
    ? parseHouseRules(property.houseRulesText)
    : { restrictions: [], extras: [], notes: "" };
  const restrictions = parsed.restrictions.length > 0 ? parsed.restrictions : notAllowedRules;

  return (
    <div className="mt-10">
      <h2 className="font-serif text-2xl text-ink">Good to Know</h2>

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean/10 text-ocean">
              <RulesIcon />
            </span>
            <h3 className="font-serif text-lg text-ink">House Rules</h3>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-sand-dark/40 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/45">
                Check-in
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ink">After {property.checkInTime}</p>
            </div>
            <div className="rounded-2xl bg-sand-dark/40 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/45">
                Check-out
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ink">By {property.checkOutTime}</p>
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            {allowedRules.map((rule) => (
              <div key={rule} className="flex items-center gap-3 text-sm text-ink/75">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-palm/10 text-palm">
                  <CheckIcon />
                </span>
                {rule}
              </div>
            ))}
          </div>

          <div className="my-4 border-t border-ink/10" />

          <div className="space-y-2.5">
            {restrictions.map((rule) => (
              <div key={rule} className="flex items-center gap-3 text-sm text-ink/75">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-700/70">
                  <CrossIcon />
                </span>
                {rule}
              </div>
            ))}
          </div>

          {parsed.extras.length > 0 && (
            <div className="mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/45">
                Early check-in &amp; late check-out
              </p>
              <ul className="mt-2.5 space-y-2.5">
                {parsed.extras.map((extra) => (
                  <li key={extra} className="flex items-start gap-3 text-sm text-ink/75">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean/10 text-ocean">
                      <SmallClockIcon />
                    </span>
                    {extra}
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 pl-8 text-xs text-ink/50">
                Please ask before your stay so we can schedule housekeeping.
              </p>
            </div>
          )}

          {parsed.notes && (
            <div className="mt-6 rounded-2xl bg-sand-dark/40 p-4">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-ink/45">
                <span className="text-gold">
                  <HeartIcon />
                </span>
                A note from your hosts
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{parsed.notes}</p>
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <PolicyIcon />
            </span>
            <h3 className="font-serif text-lg text-ink">Cancellation Policy</h3>
          </div>

          <ul className="mt-5 space-y-3">
            {property.cancellationTiers.map((tier) => (
              <li
                key={tier.window}
                className="flex items-center gap-3 rounded-2xl bg-sand-dark/40 px-4 py-3.5 text-sm"
              >
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${tierAccents[tier.refund] ?? "bg-ink/30"}`}
                  aria-hidden="true"
                />
                <span className="flex-1 text-ink/70">{tier.window}</span>
                <span className="font-semibold text-ink">{tier.refund}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink/50">
            {property.source === "hostaway"
              ? `Based on this property's "${property.cancellationPolicyName}" policy — confirmed at booking.`
              : "Standard policy shown — final terms confirmed at booking."}
          </p>
        </div>
      </div>
    </div>
  );
}
