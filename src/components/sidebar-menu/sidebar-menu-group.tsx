import type { HTMLAttributes, ReactNode } from "react";
import { useSidebarMenu } from "./sidebar-menu-context";

interface SidebarMenuGroupProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
  /** `bottom` marks a trailing cluster (e.g. utility actions). */
  position?: "top" | "bottom";
}

/**
 * Groups items as a list. Renders as <ul> so it can sit directly under <nav>
 * or inside a flex layout wrapper from the consumer.
 */
export function SidebarMenuGroup({
  children,
  position = "top",
  ...props
}: SidebarMenuGroupProps) {
  useSidebarMenu("SidebarMenu.Group");

  return (
    <ul
      data-sidebar-group=""
      data-position={position}
      role="list"
      style={{ listStyle: "none", margin: 0, padding: 0 }}
      {...props}
    >
      {children}
    </ul>
  );
}
