import type { ReactNode } from "react";
import { BottomSheet } from "@/components/bottom-sheet";
import { CollapsedFlyout } from "./collapsed-flyout";
import { useSidebarMenu } from "./sidebar-menu-context";
import { useSubmenu } from "./sidebar-menu-submenu";

interface SidebarMenuSubmenuContentProps {
  children: ReactNode;
  title?: ReactNode;
}

export function SidebarMenuSubmenuContent({
  children,
  title = "Menu",
}: SidebarMenuSubmenuContentProps) {
  const { mode } = useSidebarMenu("SidebarMenu.SubmenuContent");
  const {
    open,
    setOpen,
    contentId,
    triggerId,
    triggerRef,
    openWithHover,
    closeWithHover,
    cancelHoverTimers,
  } = useSubmenu("SidebarMenu.SubmenuContent");

  if (mode === "wide") {
    // Stay mounted while closed so child isActive can still register for auto-expand.
    return (
      <ul
        id={contentId}
        role="group"
        aria-labelledby={triggerId}
        data-sidebar-submenu-content=""
        data-mode="wide"
        data-state={open ? "open" : "closed"}
        hidden={!open}
        style={{ listStyle: "none", margin: 0, padding: 0 }}
      >
        {children}
      </ul>
    );
  }

  if (mode === "collapsed") {
    return (
      <CollapsedFlyout
        open={open}
        setOpen={setOpen}
        contentId={contentId}
        triggerId={triggerId}
        triggerRef={triggerRef}
        openWithHover={openWithHover}
        closeWithHover={closeWithHover}
        cancelHoverTimers={cancelHoverTimers}
      >
        {children}
      </CollapsedFlyout>
    );
  }

  return (
    <BottomSheet open={open} onOpenChange={setOpen}>
      <BottomSheet.Content>
        <div data-sidebar-sheet-header="">
          <BottomSheet.Title>{title}</BottomSheet.Title>
          <BottomSheet.Close aria-label="Close submenu">×</BottomSheet.Close>
        </div>
        <ul
          id={contentId}
          role="group"
          aria-labelledby={triggerId}
          data-sidebar-submenu-content=""
          data-mode="mobile"
          style={{ listStyle: "none", margin: 0, padding: 0 }}
        >
          {children}
        </ul>
      </BottomSheet.Content>
    </BottomSheet>
  );
}
