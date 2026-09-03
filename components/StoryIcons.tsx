function iconProps(className: string) {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    "aria-hidden": true as const,
    className,
  };
}

export function PalmIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M12 21V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M12 11C12 11 12.8 4 19 3C19 3 19.5 8.5 12 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C12 11 11.2 4 5 3C5 3 4.5 8.5 12 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 9.5C12 9.5 14 5.5 20 6.5C20 6.5 19 11 12 9.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M12 9.5C12 9.5 10 5.5 4 6.5C4 6.5 5 11 12 9.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path
        d="M12 20.5C12 20.5 3.5 15.6 3.5 9.5C3.5 6.7 5.7 4.5 8.5 4.5C10 4.5 11.3 5.2 12 6.3C12.7 5.2 14 4.5 15.5 4.5C18.3 4.5 20.5 6.7 20.5 9.5C20.5 15.6 12 20.5 12 20.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon({
  className = "",
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg {...iconProps(className)}>
      <path
        d="M12 3.5L14.5 9.2L20.5 9.8L15.9 13.8L17.3 19.8L12 16.6L6.7 19.8L8.1 13.8L3.5 9.8L9.5 9.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}
