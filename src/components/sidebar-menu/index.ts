import { SidebarMenuRoot } from "./sidebar-menu-context";
import { SidebarMenuNav } from "./sidebar-menu-nav";
import { SidebarMenuGroup } from "./sidebar-menu-group";
import { SidebarMenuItem } from "./sidebar-menu-item";
import { SidebarMenuLink } from "./sidebar-menu-link";
import { SidebarMenuSubmenu } from "./sidebar-menu-submenu";
import { SidebarMenuSubmenuTrigger } from "./sidebar-menu-submenu-trigger";
import { SidebarMenuSubmenuContent } from "./sidebar-menu-submenu-content";
import { SidebarMenuCollapseToggle } from "./sidebar-menu-collapse-toggle";
import { SidebarMenuTooltip } from "./sidebar-menu-tooltip";
import {
  SidebarMenuDesktop,
  SidebarMenuMobileBar,
} from "./sidebar-menu-mobile-bar";

export const SidebarMenu = Object.assign(SidebarMenuRoot, {
  Desktop: SidebarMenuDesktop,
  MobileBar: SidebarMenuMobileBar,
  Nav: SidebarMenuNav,
  Group: SidebarMenuGroup,
  Item: SidebarMenuItem,
  Link: SidebarMenuLink,
  Submenu: SidebarMenuSubmenu,
  SubmenuTrigger: SidebarMenuSubmenuTrigger,
  SubmenuContent: SidebarMenuSubmenuContent,
  CollapseToggle: SidebarMenuCollapseToggle,
  Tooltip: SidebarMenuTooltip,
});

export type { SidebarMode } from "./sidebar-menu-context";
export type { SidebarLinkRenderProps } from "./sidebar-menu-link";
export type { SubmenuTriggerRenderProps } from "./sidebar-menu-submenu-trigger";
export type { CollapseToggleRenderProps } from "./sidebar-menu-collapse-toggle";
export type {
  SidebarTooltipRenderProps,
  TooltipEnabled,
} from "./sidebar-menu-tooltip";
