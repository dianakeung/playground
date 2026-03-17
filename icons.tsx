import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  accent?: boolean;
  compact?: boolean;
};

function BaseIcon({ children, compact = false, ...props }: IconProps) {
  const size = compact ? 20 : 24;

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {children}
    </svg>
  );
}

export function YextSealIcon({ compact = false }: IconProps) {
  const size = compact ? 20 : 40;

  return (
    <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 40 40" width={size}>
      <circle cx="20" cy="20" fill="#161616" r="19.5" stroke="#fff" />
      <path d="M12 11h3.1l2.9 4.74L20.9 11H24l-4.37 6.87L24 25h-3.1L18 20.23 15.1 25H12l4.37-7.13L12 11Z" fill="#fff" />
      <path d="M27.4 11h1.8l-7.6 14h-1.8l7.6-14Z" fill="#fff" opacity=".84" />
    </svg>
  );
}

export function ArrowLeftIcon() {
  return (
    <BaseIcon>
      <path d="M14.75 6.75 9.5 12l5.25 5.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="M10 12h8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </BaseIcon>
  );
}

function StrokeIcon({ children }: { children: ReactNode }) {
  return <BaseIcon stroke="currentColor">{children}</BaseIcon>;
}

export function SearchIcon() {
  return (
    <StrokeIcon>
      <circle cx="11" cy="11" r="5.6" strokeWidth="1.7" />
      <path d="m15.2 15.2 4 4" strokeLinecap="round" strokeWidth="1.7" />
    </StrokeIcon>
  );
}

export function ScoutIcon() {
  return (
    <StrokeIcon>
      <circle cx="12" cy="12" r="6.25" strokeWidth="1.6" />
      <path d="M8.5 13.2h7M10.1 9.8l1.7 3.4 2-4.4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </StrokeIcon>
  );
}

export function ActionCenterIcon({ accent = false }: IconProps) {
  const color = accent ? "#5a58f2" : "currentColor";
  const gradientId = accent ? "action-center-gradient" : undefined;

  return (
    <svg aria-hidden="true" fill="none" height="24" viewBox="0 0 24 24" width="24">
      {accent ? (
        <defs>
          <linearGradient id="action-center-gradient" x1="5" x2="20" y1="19" y2="4" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e230d6" />
            <stop offset="1" stopColor="#0046f7" />
          </linearGradient>
        </defs>
      ) : null}
      <path d="M18.4 7.2a7.5 7.5 0 1 0 1.48 7.72" stroke={gradientId ? `url(#${gradientId})` : color} strokeLinecap="round" strokeWidth="1.8" />
      <path d="M13 11.2 18.8 5.4v4.05H23" stroke={gradientId ? `url(#${gradientId})` : color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M8.5 12.2a3.5 3.5 0 0 0 5.95 2.52" stroke={gradientId ? `url(#${gradientId})` : color} strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export function HomeIcon() {
  return (
    <StrokeIcon>
      <path d="M5 10.8 12 5l7 5.8v8.2h-5.2v-5.4H10.2v5.4H5v-8.2Z" strokeLinejoin="round" strokeWidth="1.6" />
    </StrokeIcon>
  );
}

export function FavoritesIcon() {
  return (
    <StrokeIcon>
      <path d="m12 5.9 1.87 3.8 4.2.61-3.03 2.95.72 4.17L12 15.45 8.24 17.4l.72-4.15L5.93 10.3l4.2-.61L12 5.9Z" strokeLinejoin="round" strokeWidth="1.6" />
    </StrokeIcon>
  );
}

export function ContentIcon() {
  return (
    <StrokeIcon>
      <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="16" cy="6.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="16" cy="17.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="8" cy="16" r="1.4" fill="currentColor" stroke="none" />
      <path d="M9.1 8.5 14.8 7M9.2 15.4l5.6 1.4M8.7 9.4v5.1M15.3 8.1v8" strokeLinecap="round" strokeWidth="1.5" />
    </StrokeIcon>
  );
}

export function ListingsIcon() {
  return (
    <StrokeIcon>
      <path d="M7 6.5h10v11H7zM7 10.5h10M11 6.5v11" strokeLinejoin="round" strokeWidth="1.6" />
    </StrokeIcon>
  );
}

export function PagesIcon() {
  return (
    <StrokeIcon>
      <rect height="8.8" rx="1.2" strokeWidth="1.6" width="12.4" x="5.3" y="7.6" />
      <path d="M8 5h10.7v9.2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </StrokeIcon>
  );
}

export function ChatIcon() {
  return (
    <StrokeIcon>
      <path d="M6 7.2h12v8.2H9.2L6 18v-2.6H6V7.2Z" strokeLinejoin="round" strokeWidth="1.6" />
      <path d="M9 10.7h6M9 13.2h4.2" strokeLinecap="round" strokeWidth="1.5" />
    </StrokeIcon>
  );
}

export function ReviewsIcon() {
  return (
    <StrokeIcon>
      <path d="m8.5 15.8-2.4 1.3.46-2.8L4.5 12.3l2.82-.41L8.5 9.3l1.18 2.58 2.82.41-2.03 2 .48 2.8-2.45-1.3Z" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="m15.2 15.8-1.5.82.3-1.77-1.28-1.26 1.78-.26.7-1.62.73 1.62 1.76.26-1.27 1.26.28 1.77-1.5-.82Z" strokeLinejoin="round" strokeWidth="1.4" />
    </StrokeIcon>
  );
}

export function AnalyticsIcon() {
  return (
    <StrokeIcon>
      <path d="M6.2 16.8v-4.4M10.6 16.8V8.4M15 16.8v-6.6M19.4 16.8V5.8M4.5 18.5h15" strokeLinecap="round" strokeWidth="1.7" />
      <circle cx="6.2" cy="11" fill="currentColor" r="1.1" stroke="none" />
      <circle cx="10.6" cy="7" fill="currentColor" r="1.1" stroke="none" />
      <circle cx="15" cy="9" fill="currentColor" r="1.1" stroke="none" />
      <circle cx="19.4" cy="4.4" fill="currentColor" r="1.1" stroke="none" />
    </StrokeIcon>
  );
}

export function AppsIcon() {
  return (
    <StrokeIcon>
      <rect height="3.4" rx=".6" strokeWidth="1.5" width="3.4" x="5.5" y="5.5" />
      <rect height="3.4" rx=".6" strokeWidth="1.5" width="3.4" x="10.3" y="5.5" />
      <rect height="3.4" rx=".6" strokeWidth="1.5" width="3.4" x="15.1" y="5.5" />
      <rect height="3.4" rx=".6" strokeWidth="1.5" width="3.4" x="5.5" y="10.3" />
      <rect height="3.4" rx=".6" strokeWidth="1.5" width="3.4" x="10.3" y="10.3" />
      <rect height="3.4" rx=".6" strokeWidth="1.5" width="3.4" x="15.1" y="10.3" />
      <rect height="3.4" rx=".6" strokeWidth="1.5" width="3.4" x="5.5" y="15.1" />
      <rect height="3.4" rx=".6" strokeWidth="1.5" width="3.4" x="10.3" y="15.1" />
      <rect height="3.4" rx=".6" strokeWidth="1.5" width="3.4" x="15.1" y="15.1" />
    </StrokeIcon>
  );
}

export function DeveloperIcon() {
  return (
    <StrokeIcon>
      <path d="m8.2 8.4-3 3.6 3 3.6M15.8 8.4l3 3.6-3 3.6M13.5 6.8l-3 10.4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </StrokeIcon>
  );
}

export function BellIcon() {
  return (
    <StrokeIcon>
      <path d="M12 5.6a4 4 0 0 1 4 4v2.2c0 .78.24 1.53.68 2.18l.82 1.22H6.5l.82-1.22c.44-.65.68-1.4.68-2.18V9.6a4 4 0 0 1 4-4ZM10.1 18a2 2 0 0 0 3.8 0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </StrokeIcon>
  );
}

export function QuestionCircleIcon() {
  return (
    <StrokeIcon>
      <circle cx="12" cy="12" r="8" strokeWidth="1.6" />
      <path d="M9.8 9.4a2.48 2.48 0 0 1 4.76.96c0 1.72-1.85 2.12-2.56 3.14M12 16.9h.02" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </StrokeIcon>
  );
}
