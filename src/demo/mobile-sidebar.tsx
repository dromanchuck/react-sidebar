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
import { NavItemLabel } from "@/demo/sidebar-styles";
import { INVENTORY_LINKS, MobileLeaf, SubLink } from "@/demo/nav-items";

interface MobileSidebarProps {
  inventoryActive: boolean;
}

export function MobileSidebar({ inventoryActive }: MobileSidebarProps) {
  return (
    <SidebarMenu.MobileBar
      aria-label="GreenBasket mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-accent bg-sidebar"
    >
      <ul
        className="flex list-none items-stretch justify-around px-1 py-1"
        role="list"
      >
        <MobileLeaf
          menuKey="dashboard"
          path="/dashboard"
          icon={LayoutDashboard}
          label="Home"
        />
        <MobileLeaf
          menuKey="deliveries"
          path="/deliveries"
          icon={Truck}
          label="Deliver"
        />
        <MobileLeaf
          menuKey="partners"
          path="/partners"
          icon={Store}
          label="Partners"
        />
        <MobileLeaf
          menuKey="customers"
          path="/customers"
          icon={Users}
          label="Clients"
        />
        <MobileLeaf
          menuKey="analytics"
          path="/analytics"
          icon={PieChart}
          label="Stats"
        />

        <SidebarMenu.Submenu defaultOpen={inventoryActive} className="flex-1">
          <SidebarMenu.SubmenuTrigger isActive={inventoryActive}>
            {({ isActive: active, mode }) => (
              <NavItemLabel
                icon={Cherry}
                label="Stock"
                isActive={active}
                mode={mode}
                iconOnly
              />
            )}
          </SidebarMenu.SubmenuTrigger>
          <SidebarMenu.SubmenuContent title="Inventory">
            {INVENTORY_LINKS.map((link) => (
              <SubLink key={link.menuKey} {...link} sheet />
            ))}
          </SidebarMenu.SubmenuContent>
        </SidebarMenu.Submenu>

        <MobileLeaf
          menuKey="billing"
          path="/billing"
          icon={CircleDollarSign}
          label="Billing"
        />
      </ul>
    </SidebarMenu.MobileBar>
  );
}
