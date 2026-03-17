import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";

type AppShellProps = PropsWithChildren<{
  sidebar: ReactNode;
}>;

type NavItemProps = PropsWithChildren<{
  active?: boolean;
  badge?: ReactNode;
  icon: ReactNode;
}>;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
  className?: string;
  size?: "md" | "sm";
  variant?: "primary" | "secondary" | "dark";
}>;

type FeatureBadgeProps = PropsWithChildren<{
  inverted?: boolean;
}>;

export function AppShell({ children, sidebar }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">{sidebar}</aside>
      <main className="app-shell__main">{children}</main>
    </div>
  );
}

export function NavItem({ active = false, badge, children, icon }: NavItemProps) {
  const className = active ? "nav-item nav-item--active" : "nav-item";

  return (
    <button className={className} type="button">
      <span className="nav-item__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="nav-item__label">{children}</span>
      {badge ? <span className="nav-item__badge">{badge}</span> : null}
    </button>
  );
}

export function Button({
  children,
  className = "",
  disabled = false,
  onClick,
  size = "md",
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const classes = ["button", `button--${variant}`, `button--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export function FeatureBadge({ children, inverted = false }: FeatureBadgeProps) {
  const className = inverted ? "feature-badge feature-badge--inverted" : "feature-badge";

  return <span className={className}>{children}</span>;
}
