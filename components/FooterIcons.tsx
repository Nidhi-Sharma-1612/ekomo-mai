import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

function icon(Icon: LucideIcon, defaultSize = 16) {
  return function IconComponent({ className = "" }: { className?: string }) {
    return <Icon size={defaultSize} strokeWidth={1.75} className={className} />;
  };
}

export const MailIcon = icon(Mail);
export const PhoneIcon = icon(Phone);
export const PinIcon = icon(MapPin);

/** lucide-react dropped brand/social glyphs for licensing reasons — kept as custom icons. */
function iconProps(className: string) {
  return {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    "aria-hidden": true as const,
    className,
  };
}

export function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path
        d="M15 8.5H17V5.5H15C12.7909 5.5 11 7.29086 11 9.5V11.5H9V14.5H11V21H14V14.5H16.5L17 11.5H14V9.5C14 8.94772 14.4477 8.5 15 8.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}
