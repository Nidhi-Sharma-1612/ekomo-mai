export default function WaveDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 110"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,64 C240,110 480,10 720,32 C960,54 1200,96 1440,50 L1440,110 L0,110 Z"
        fill="var(--color-sand)"
      />
    </svg>
  );
}
