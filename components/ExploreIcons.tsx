function iconProps(className: string) {
  return {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    "aria-hidden": true as const,
    className,
  };
}

export function UmbrellaIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M12 11V20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 20.5C12 20.5 12.5 22 10.5 22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M3 11C3 6.5 7 3 12 3C17 3 21 6.5 21 11H3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 3V11" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function FishIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path
        d="M3 12C6 8 10 6.5 14 7.5C18 8.5 20.5 10.5 21.5 12C20.5 13.5 18 15.5 14 16.5C10 17.5 6 16 3 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 7.5L16.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 16.5L16.5 19.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7.5" cy="11.2" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function PaddleboardIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <ellipse cx="11" cy="17.5" rx="9" ry="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 17C4 17 6 8 10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 5L9 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function SunriseIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M4 18H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 18C6 14.5 8.5 12 12 12C15.5 12 18 14.5 18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 6V8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 11L6.8 12.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M19 11L17.2 12.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2.5 21H21.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
