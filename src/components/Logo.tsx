import { useState } from "react";

/**
 * KALM mark — a faithful, geometric interpretation of the interlocking
 * "X" motif from the supplied logo, used ONLY as a fallback/accent when the
 * real raster logo is not present. The real logo is always preferred.
 */
function KalmMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="7"
      >
        <path d="M18 18 L46 46" stroke="#8998A7" />
        <path d="M46 18 L18 46" stroke="#aab6c2" />
      </g>
    </svg>
  );
}

type Variant = "on-dark" | "on-light";

/**
 * Primary KALM brand lockup. Loads /logos/kalm-logo.jpg if present; otherwise
 * renders an accessible mark + wordmark so the layout never looks broken.
 */
export function KalmLogo({
  variant = "on-dark",
  height = 40,
}: {
  variant?: Variant;
  height?: number;
}) {
  const [imgOk, setImgOk] = useState(true);
  const wordColor = variant === "on-dark" ? "#ffffff" : "#172A3B";

  if (imgOk) {
    // The supplied KALM logo is a square, stacked lockup (mark above the
    // "KALM GROUP" wordmark) on its own deep-navy background with generous
    // internal padding. We crop that padding away with an overflow box and a
    // slight zoom so the lockup fills the space and the compressed edges fall
    // outside the visible frame. The navy matches the header/footer, so it
    // reads as a clean mark on dark; on light surfaces we keep a navy chip.
    const CROP = 1.46; // zoom factor to trim the logo's built-in padding + edges
    const boxH = height;
    const boxW = Math.round(height * 1.9); // room for the stacked wordmark
    const img = (
      <span
        aria-label="KALM Group"
        role="img"
        style={{
          display: "block",
          width: boxW,
          height: boxH,
          overflow: "hidden",
          borderRadius: variant === "on-light" ? "var(--radius)" : 6,
          border:
            variant === "on-dark"
              ? "1px solid rgba(255,255,255,0.08)"
              : undefined,
        }}
      >
        <img
          src="/logos/kalm-logo.jpg"
          alt="KALM Group"
          style={{
            width: `${CROP * 100}%`,
            height: `${CROP * 100}%`,
            objectFit: "contain",
            // Center the cropped square within the wider box.
            transform: "translate(-50%, -50%)",
            position: "relative",
            left: "50%",
            top: "50%",
          }}
          onError={() => setImgOk(false)}
          decoding="async"
        />
      </span>
    );
    return img;
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
      }}
    >
      <KalmMark size={height} />
      <span
        style={{
          fontFamily: "var(--font-head)",
          fontWeight: 600,
          letterSpacing: "0.06em",
          fontSize: height * 0.52,
          color: wordColor,
          lineHeight: 1,
        }}
      >
        KALM GROUP
      </span>
    </span>
  );
}

/**
 * Puma Energy partner logo. Restrained usage; original colours preserved.
 * Loads /logos/puma-energy.png if present; otherwise an accessible text label.
 */
export function PumaLogo({ height = 48 }: { height?: number }) {
  const [imgOk, setImgOk] = useState(true);

  if (imgOk) {
    return (
      <img
        src="/logos/puma-energy.png"
        alt="Puma Energy"
        height={height}
        style={{ height, width: "auto" }}
        onError={() => setImgOk(false)}
        decoding="async"
      />
    );
  }

  return (
    <span
      aria-label="Puma Energy"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: 1.1,
        fontFamily: "var(--font-body)",
        fontWeight: 700,
      }}
    >
      <span style={{ color: "var(--puma-red)", fontSize: height * 0.42 }}>
        PUMA
      </span>
      <span
        style={{
          color: "var(--puma-green)",
          fontSize: height * 0.2,
          letterSpacing: "0.22em",
        }}
      >
        ENERGY
      </span>
    </span>
  );
}
