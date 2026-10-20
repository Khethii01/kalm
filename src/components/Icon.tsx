type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

export type IconName =
  | "truck"
  | "pickaxe"
  | "building"
  | "factory"
  | "fuel"
  | "wheat"
  | "store"
  | "droplet"
  | "repeat"
  | "doc"
  | "check"
  | "shield"
  | "handshake"
  | "mail"
  | "arrow";

const paths: Record<IconName, JSX.Element> = {
  truck: (
    <>
      <path d="M3 6h11v9H3z" />
      <path d="M14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </>
  ),
  pickaxe: (
    <>
      <path d="M3 21 13 11" />
      <path d="M4.5 9.5c3-3 8-3 11 0" />
      <path d="M9.5 4.5c3 3 3 8 0 11" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
      <path d="M14 10h5a1 1 0 0 1 1 1v10" />
      <path d="M7 8h3M7 12h3M7 16h3M17 14h0M17 18h0" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V10l6 4V10l6 4V7l5 3v11z" />
      <path d="M3 21h18" />
    </>
  ),
  fuel: (
    <>
      <rect x="4" y="3" width="9" height="18" rx="1" />
      <path d="M13 8h3l2 2v7a1.5 1.5 0 0 1-3 0v-4h-2" />
      <path d="M6 7h5" />
    </>
  ),
  wheat: (
    <>
      <path d="M12 21V9" />
      <path d="M12 9c-2-1-3-3-3-5 2 0 4 1 4 4" />
      <path d="M12 9c2-1 3-3 3-5-2 0-4 1-4 4" />
      <path d="M12 15c-2-1-3-2-3-4 2 0 4 1 4 3" />
    </>
  ),
  store: (
    <>
      <path d="M4 9h16l-1-5H5z" />
      <path d="M4 9v11h16V9" />
      <path d="M9 20v-5h6v5" />
    </>
  ),
  droplet: <path d="M12 3s6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 9.5 12 3 12 3z" />,
  repeat: (
    <>
      <path d="M4 9a6 6 0 0 1 10-4l2 2" />
      <path d="M20 15a6 6 0 0 1-10 4l-2-2" />
      <path d="M16 3v4h-4M8 21v-4h4" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 16h6" />
    </>
  ),
  check: <path d="M4 12l5 5L20 6" />,
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  handshake: (
    <>
      <path d="M3 10l4-3 5 3 5-3 4 3" />
      <path d="M7 13l3 3 2-2 3 3" />
      <path d="M3 10v5M21 10v5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export default function Icon({ name, size = 24, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
