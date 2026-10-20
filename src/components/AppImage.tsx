import { useState } from "react";

/**
 * Responsive image with a branded fallback. If the remote photograph fails to
 * load (offline build, blocked host), a tasteful navy gradient panel is shown
 * instead so layouts never break. Always requires descriptive alt text.
 */
export default function AppImage({
  src,
  alt,
  className,
  style,
  ratio,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  /** aspect-ratio, e.g. "16 / 9" */
  ratio?: string;
  loading?: "lazy" | "eager";
}) {
  const [ok, setOk] = useState(true);

  const wrapStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #0f1d28 0%, #22384a 55%, #2d4457 100%)",
    aspectRatio: ratio,
    ...style,
  };

  return (
    <div className={className} style={wrapStyle} role={ok ? undefined : "img"} aria-label={ok ? undefined : alt}>
      {ok ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onError={() => setOk(false)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(600px 240px at 80% -10%, rgba(137,152,167,0.22), transparent 60%)",
          }}
        />
      )}
    </div>
  );
}

/**
 * Curated, royalty-free industrial photography (Unsplash). Each is referenced
 * with descriptive alt text at the point of use.
 */
export const PHOTOS = {
  heroLogistics: "/photos/hero-logistics.jpg",
  mining: "/photos/mining.jpg",
  transport: "/photos/transport.jpg",
  construction: "/photos/construction.jpg",
  industrial: "/photos/industrial.jpg",
  retailer: "/photos/retailer.jpg",
  agriculture: "/photos/agriculture.jpg",
  tanker: "/photos/tanker.jpg",
} as const;
