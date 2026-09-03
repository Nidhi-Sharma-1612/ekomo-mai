import {
  allowedRules,
  cancellationTiers,
  checkInTime,
  checkOutTime,
  notAllowedRules,
} from "@/lib/data/policies";
import { CheckIcon, ClockIcon, CrossIcon, PolicyIcon } from "@/components/PropertyIcons";

const tierAccents: Record<string, string> = {
  "Full refund": "bg-palm",
  "50% refund": "bg-gold",
  "No refund": "bg-ink/30",
};

export default function GoodToKnow() {
  return (
    <div className="mt-10">
      <h2 className="font-serif text-2xl text-ink">Good to Know</h2>

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean/10 text-ocean">
              <ClockIcon />
            </span>
            <h3 className="font-serif text-lg text-ink">House Rules</h3>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-sand-dark/40 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/45">
                Check-in
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ink">After {checkInTime}</p>
            </div>
            <div className="rounded-2xl bg-sand-dark/40 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/45">
                Check-out
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ink">By {checkOutTime}</p>
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
            {notAllowedRules.map((rule) => (
              <div key={rule} className="flex items-center gap-3 text-sm text-ink/60">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink/40">
                  <CrossIcon />
                </span>
                {rule}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <PolicyIcon />
            </span>
            <h3 className="font-serif text-lg text-ink">Cancellation Policy</h3>
          </div>

          <ul className="mt-5 space-y-3">
            {cancellationTiers.map((tier) => (
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
            Standard policy shown — final terms confirmed at booking.
          </p>
        </div>
      </div>
    </div>
  );
}
