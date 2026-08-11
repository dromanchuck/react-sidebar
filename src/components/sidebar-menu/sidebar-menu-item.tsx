import type { HTMLAttributes, ReactNode } from "react";
import { useSidebarMenu } from "./sidebar-menu-context";

interface SidebarMenuItemProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

export function SidebarMenuItem({ children, ...props }: SidebarMenuItemProps) {
  useSidebarMenu("SidebarMenu.Item");

  return (
    <li data-sidebar-item="" {...props}>
      {children}
    </li>
  );
}
