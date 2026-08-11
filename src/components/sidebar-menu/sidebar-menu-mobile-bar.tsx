import type { HTMLAttributes, ReactNode } from "react";
import { useSidebarMenu } from "./sidebar-menu-context";

interface SidebarMenuDesktopProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function SidebarMenuDesktop({
  children,
  ...props
}: SidebarMenuDesktopProps) {
  const { mode } = useSidebarMenu("SidebarMenu.Desktop");

  return (
    <div
      data-sidebar-desktop=""
      data-mode={mode}
      hidden={mode === "mobile"}
      {...props}
    >
      {children}
    </div>
  );
}

interface SidebarMenuMobileBarProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  "aria-label"?: string;
}

export function SidebarMenuMobileBar({
  children,
  "aria-label": ariaLabel = "Mobile navigation",
  ...props
}: SidebarMenuMobileBarProps) {
  const { mode } = useSidebarMenu("SidebarMenu.MobileBar");

  return (
    <nav
      data-sidebar-mobile-bar=""
      data-mode={mode}
      aria-label={ariaLabel}
      hidden={mode !== "mobile"}
      {...props}
    >
      {children}
    </nav>
  );
}
