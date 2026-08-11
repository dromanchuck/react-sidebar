import type { LucideIcon } from "lucide-react";
import { SidebarMenu } from "@/components/sidebar-menu";
import {
  CollapsedTooltip,
  FlyoutItemLabel,
  NavItemLabel,
  SubItemLabel,
} from "@/demo/sidebar-styles";
import { useNavWiring } from "@/demo/nav-wiring-context";
import type { MenuKey } from "@/demo/menu-keys";

interface LeafItemProps {
  menuKey: MenuKey;
  path: string;
  icon: LucideIcon;
  label: string;
}

export function LeafItem({ menuKey, path, icon, label }: LeafItemProps) {
  const { isActive, renderNavItem } = useNavWiring();

  return (
    <SidebarMenu.Item>
      <CollapsedTooltip label={label}>
        <SidebarMenu.Link
          isActive={isActive(menuKey)}
          render={renderNavItem(menuKey, path)}
        >
          {({ isActive: active, mode }) => (
            <NavItemLabel
              icon={icon}
              label={label}
              isActive={active}
              mode={mode}
            />
          )}
        </SidebarMenu.Link>
      </CollapsedTooltip>
    </SidebarMenu.Item>
  );
}

export function MobileLeaf({ menuKey, path, icon, label }: LeafItemProps) {
  const { isActive, renderNavItem } = useNavWiring();

  return (
    <SidebarMenu.Item className="flex-1">
      <SidebarMenu.Link
        isActive={isActive(menuKey)}
        render={renderNavItem(menuKey, path)}
      >
        {({ isActive: active, mode }) => (
          <NavItemLabel
            icon={icon}
            label={label}
            isActive={active}
            mode={mode}
            iconOnly
          />
        )}
      </SidebarMenu.Link>
    </SidebarMenu.Item>
  );
}

interface SubLinkProps {
  menuKey: MenuKey;
  path: string;
  label: string;
  sheet?: boolean;
}

export function SubLink({ menuKey, path, label, sheet = false }: SubLinkProps) {
  const { isActive, renderNavItem } = useNavWiring();

  return (
    <SidebarMenu.Item>
      <SidebarMenu.Link
        isActive={isActive(menuKey)}
        render={renderNavItem(menuKey, path)}
      >
        {({ isActive: active, mode }) =>
          sheet || mode === "collapsed" || mode === "mobile" ? (
            <FlyoutItemLabel label={label} isActive={active} />
          ) : (
            <SubItemLabel label={label} isActive={active} />
          )
        }
      </SidebarMenu.Link>
    </SidebarMenu.Item>
  );
}

export const INVENTORY_LINKS = [
  {
    menuKey: "inventory-stock" as const,
    path: "/inventory/stock",
    label: "Stock",
  },
  {
    menuKey: "inventory-suppliers" as const,
    path: "/inventory/suppliers",
    label: "Suppliers",
  },
  {
    menuKey: "inventory-expiring" as const,
    path: "/inventory/expiring",
    label: "Expiring",
  },
];
