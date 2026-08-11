import {
  Cherry,
  CircleDollarSign,
  LayoutDashboard,
  PieChart,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { SidebarMenu } from "@/components/sidebar-menu";
import {
  CollapseButton,
  CollapsedTooltip,
  NavItemLabel,
} from "@/demo/sidebar-styles";
import { INVENTORY_LINKS, LeafItem, SubLink } from "@/demo/nav-items";

interface DesktopSidebarProps {
  inventoryActive: boolean;
}

export function DesktopSidebar({ inventoryActive }: DesktopSidebarProps) {
  return (
    <SidebarMenu.Desktop className="flex h-screen w-fit flex-col border-r border-accent bg-sidebar">
      <div className="flex min-h-0 flex-1 flex-col px-2 py-4">
        <SidebarMenu.Nav aria-label="GreenBasket" className="flex min-h-0 flex-1 flex-col gap-4">
          <SidebarMenu.Group>
            <LeafItem
              menuKey="dashboard"
              path="/dashboard"
              icon={LayoutDashboard}
              label="Dashboard"
            />
            <LeafItem
              menuKey="deliveries"
              path="/deliveries"
              icon={Truck}
              label="Deliveries"
            />
            <LeafItem
              menuKey="partners"
              path="/partners"
              icon={Store}
              label="Partners"
            />
            <LeafItem
              menuKey="customers"
              path="/customers"
              icon={Users}
              label="Customers"
            />
            <LeafItem
              menuKey="analytics"
              path="/analytics"
              icon={PieChart}
              label="Analytics"
            />

            <SidebarMenu.Submenu defaultOpen={inventoryActive}>
              <SidebarMenu.SubmenuTrigger isActive={inventoryActive}>
                {({ isOpen, isActive: active, mode }) => (
                  <CollapsedTooltip label="Inventory" disabled={isOpen}>
                    <NavItemLabel
                      icon={Cherry}
                      label="Inventory"
                      isActive={active}
                      mode={mode}
                      hasChevron
                      isOpen={isOpen}
                    />
                  </CollapsedTooltip>
                )}
              </SidebarMenu.SubmenuTrigger>
              <SidebarMenu.SubmenuContent title="Inventory">
                {INVENTORY_LINKS.map((link) => (
                  <SubLink key={link.menuKey} {...link} />
                ))}
              </SidebarMenu.SubmenuContent>
            </SidebarMenu.Submenu>

            <LeafItem
              menuKey="billing"
              path="/billing"
              icon={CircleDollarSign}
              label="Billing"
            />
          </SidebarMenu.Group>
        </SidebarMenu.Nav>
      </div>

      <div className="border-t border-accent p-2">
        <SidebarMenu.CollapseToggle>
          {({ collapsed: isCollapsed }) => (
            <CollapseButton collapsed={isCollapsed} />
          )}
        </SidebarMenu.CollapseToggle>
      </div>
    </SidebarMenu.Desktop>
  );
}
