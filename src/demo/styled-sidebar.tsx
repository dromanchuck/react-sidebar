import type { ReactElement } from "react";
import { SidebarMenu } from "@/components/sidebar-menu";
import { DesktopSidebar } from "@/demo/desktop-sidebar";
import { MobileSidebar } from "@/demo/mobile-sidebar";
import { NavWiringProvider } from "@/demo/nav-wiring-context";
import type { MenuKey } from "@/demo/menu-keys";

export interface StyledSidebarProps {
  isActive: (key: MenuKey) => boolean;
  renderNavItem: (key: MenuKey, path?: string) => ReactElement;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function StyledSidebar({
  isActive,
  renderNavItem,
  collapsed,
  onCollapsedChange,
}: StyledSidebarProps) {
  const inventoryActive =
    isActive("inventory-stock") ||
    isActive("inventory-suppliers") ||
    isActive("inventory-expiring");

  return (
    <NavWiringProvider isActive={isActive} renderNavItem={renderNavItem}>
      <SidebarMenu collapsed={collapsed} onCollapsedChange={onCollapsedChange}>
        <DesktopSidebar inventoryActive={inventoryActive} />
        <MobileSidebar inventoryActive={inventoryActive} />
      </SidebarMenu>
    </NavWiringProvider>
  );
}
