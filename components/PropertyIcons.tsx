import { Bath, Bed, Check, Clock, Heart, ScrollText, ShieldCheck, Users, X, type LucideIcon } from "lucide-react";

function icon(Icon: LucideIcon, defaultSize = 16) {
  return function IconComponent({ className = "" }: { className?: string }) {
    return <Icon size={defaultSize} strokeWidth={1.75} className={className} />;
  };
}

export const BedIcon = icon(Bed);
export const BathIcon = icon(Bath);
export const CheckIcon = icon(Check, 13);
export const CrossIcon = icon(X, 13);
export const ClockIcon = icon(Clock);
export const GuestsIcon = icon(Users);
export const PolicyIcon = icon(ShieldCheck);
export const RulesIcon = icon(ScrollText);
export const SmallClockIcon = icon(Clock, 13);
export const HeartIcon = icon(Heart, 13);
