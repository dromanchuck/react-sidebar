import type { ReactNode } from "react";
import { useSidebarMenu, type SidebarMode } from "./sidebar-menu-context";

export interface CollapseToggleRenderProps {
  collapsed: boolean;
  mode: SidebarMode;
}

interface SidebarMenuCollapseToggleProps {
  children?: ReactNode | ((props: CollapseToggleRenderProps) => ReactNode);
  "aria-label"?: string;
}

export function SidebarMenuCollapseToggle({
  children,
  "aria-label": ariaLabel,
}: SidebarMenuCollapseToggleProps) {
  const { collapsed, setCollapsed, mode } = useSidebarMenu(
    "SidebarMenu.CollapseToggle",
  );

  const content =
    typeof children === "function" ? children({ collapsed, mode }) : children;

  return (
    <button
      type="button"
      data-sidebar-collapse-toggle=""
      data-mode={mode}
      aria-pressed={collapsed}
      aria-label={
        ariaLabel ?? (collapsed ? "Expand sidebar" : "Collapse sidebar")
      }
      hidden={mode === "mobile"}
      onClick={() => setCollapsed(!collapsed)}
    >
      {content}
    </button>
  );
}
