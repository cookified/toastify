type CloverLogoProps = {
  size?: number;
  className?: string;
};

export function CloverLogo({ size = 20, className = "" }: CloverLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Rich Imperial Emerald to Mint gradient (Top-Left Half) */}
        <linearGradient id="cloverEmerald" x1="3" y1="3" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>

        {/* Warm Molten Amber to Gilded Topaz gradient (Bottom-Right Half) */}
        <linearGradient id="cloverAmber" x1="12" y1="12" x2="29" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="55%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* Diagonal Cut Specular Gleam */}
        <linearGradient id="cloverGleam" x1="4" y1="28" x2="28" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#fef3c7" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
        </linearGradient>

        <clipPath id="cloverCutTopLeft"><polygon points="-4,-4 36,-4 -4,36" /></clipPath>
        <clipPath id="cloverCutBottomRight"><polygon points="36,36 -4,36 36,-4" /></clipPath>

        <path
          id="cloverShape"
          d="M 16 16 C 13.8 12.8 9.5 9 9.5 5.5 C 9.5 2.2 12.2 1 14.5 1.8 C 15.3 2.1 15.7 2.8 16 3.5 C 16.3 2.8 16.7 2.1 17.5 1.8 C 19.8 1 22.5 2.2 22.5 5.5 C 22.5 9 18.2 12.8 16 16 Z M 16 16 C 12.8 13.8 9 9.5 5.5 9.5 C 2.2 9.5 1 12.2 1.8 14.5 C 2.1 15.3 2.8 15.7 3.5 16 C 2.8 16.3 2.1 16.7 1.8 17.5 C 1 19.8 2.2 22.5 5.5 22.5 C 9 22.5 12.8 18.2 16 16 Z M 16 16 C 13.8 19.2 9.5 23 9.5 26.5 C 9.5 29.8 12.2 31 14.5 30.2 C 15.3 29.9 15.7 29.2 16 28.5 C 16.3 29.2 16.7 29.9 17.5 30.2 C 19.8 31 22.5 29.8 22.5 26.5 C 22.5 23 18.2 19.2 16 16 Z M 16 16 C 19.2 13.8 23 9.5 26.5 9.5 C 29.8 9.5 31 12.2 30.2 14.5 C 29.9 15.3 29.2 15.7 28.5 16 C 29.2 16.3 29.9 16.7 30.2 17.5 C 31 19.8 29.8 22.5 26.5 22.5 C 23 22.5 19.2 18.2 16 16 Z"
        />
      </defs>

      {/* Sliced Halves with Tactile Gap */}
      <use href="#cloverShape" clipPath="url(#cloverCutTopLeft)" transform="translate(-0.8, -0.8)" fill="url(#cloverEmerald)" />
      <use href="#cloverShape" clipPath="url(#cloverCutBottomRight)" transform="translate(0.8, 0.8)" fill="url(#cloverAmber)" />

      {/* Radiant Specular Edge Gleam */}
      <line x1="5" y1="27" x2="27" y2="5" stroke="url(#cloverGleam)" strokeWidth="0.85" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.5" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}
