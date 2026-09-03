function iconProps(className: string) {
  return {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    "aria-hidden": true as const,
    className,
  };
}

export function KeyIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <circle cx="8" cy="15" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 12L19.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 6.5L18.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13.5 9L15.5 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path
        d="M11 3L12.4 8.6L18 10L12.4 11.4L11 17L9.6 11.4L4 10L9.6 8.6L11 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M18.5 14L19.2 16.8L22 17.5L19.2 18.2L18.5 21L17.8 18.2L15 17.5L17.8 16.8L18.5 14Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function WrenchIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path
        d="M14.5 6.5C15.9 5.1 18 4.8 19.7 5.7L16.8 8.6L16.5 10.5L18.4 10.2L21.3 7.3C22.2 9 21.9 11.1 20.5 12.5C19.1 13.9 17 14.2 15.3 13.3L7.5 21.1C6.7 21.9 5.4 21.9 4.6 21.1C3.8 20.3 3.8 19 4.6 18.2L12.4 10.4C11.5 8.7 11.8 6.6 13.2 5.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TagIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path
        d="M11.5 4H6.5C5.67157 4 5 4.67157 5 5.5V10.5C5 10.8978 5.15804 11.2794 5.43934 11.5607L14.4393 20.5607C15.0251 21.1464 15.9749 21.1464 16.5607 20.5607L20.5607 16.5607C21.1464 15.9749 21.1464 15.0251 20.5607 14.4393L11.5607 5.43934C11.2794 5.15804 10.8978 5 10.5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

export function ChatIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path
        d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C10.6893 20 9.45245 19.6825 8.36 19.12L4.5 20L5.5 16.4C4.55 15.15 4 13.63 4 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GiftIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="4" y="9" width="16" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="5" y="13" width="14" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 9V21" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 9C12 9 8.5 9 8.5 6.5C8.5 5.11929 9.61929 4 11 4C12.5 4 12 6 12 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 9C12 9 15.5 9 15.5 6.5C15.5 5.11929 14.3807 4 13 4C11.5 4 12 6 12 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
