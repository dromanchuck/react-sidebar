import type { HTMLAttributes, ReactNode } from "react";
import { useSidebarMenu } from "./sidebar-menu-context";

interface SidebarMenuNavProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  "aria-label": string;
}

/**
 * Semantic <nav> root. Groups provide list structure so consumers can
 * lay out top/bottom clusters without invalid ul > div nesting.
 */
export function SidebarMenuNav({ children, ...props }: SidebarMenuNavProps) {
  useSidebarMenu("SidebarMenu.Nav");

  return (
    <nav data-sidebar-nav="" {...props}>
      {children}
    </nav>
  );
}
