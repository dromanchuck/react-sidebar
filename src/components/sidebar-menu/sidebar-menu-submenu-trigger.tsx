import type { ReactNode, RefObject } from "react";
import { useSidebarMenu, type SidebarMode } from "./sidebar-menu-context";
import { useSubmenu } from "./sidebar-menu-submenu";

export interface SubmenuTriggerRenderProps {
  isOpen: boolean;
  isActive: boolean;
  mode: SidebarMode;
  collapsed: boolean;
}

interface SidebarMenuSubmenuTriggerProps {
  isActive?: boolean;
  children?: ReactNode | ((props: SubmenuTriggerRenderProps) => ReactNode);
}

export function SidebarMenuSubmenuTrigger({
  isActive: isActiveProp = false,
  children,
}: SidebarMenuSubmenuTriggerProps) {
  const { mode, collapsed } = useSidebarMenu("SidebarMenu.SubmenuTrigger");
  const {
    open,
    setOpen,
    contentId,
    triggerId,
    hasActiveChild,
    triggerRef,
    openWithHover,
    closeWithHover,
    cancelHoverTimers,
  } = useSubmenu("SidebarMenu.SubmenuTrigger");

  const isActive = isActiveProp || hasActiveChild;

  const content =
    typeof children === "function"
      ? children({ isOpen: open, isActive, mode, collapsed })
      : children;

  return (
    <button
      ref={triggerRef as RefObject<HTMLButtonElement>}
      type="button"
      id={triggerId}
      aria-expanded={open}
      aria-controls={contentId}
      data-sidebar-submenu-trigger=""
      data-active={isActive ? "" : undefined}
      data-state={open ? "open" : "closed"}
      data-mode={mode}
      onClick={() => {
        cancelHoverTimers();
        setOpen(!open);
      }}
      onMouseEnter={mode === "collapsed" ? openWithHover : undefined}
      onMouseLeave={mode === "collapsed" ? closeWithHover : undefined}
    >
      {content}
    </button>
  );
}
