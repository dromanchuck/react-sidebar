import { useContext, type ReactNode } from "react";
import { ActiveChildRegistryProvider } from "./active-child-registry";
import { SubmenuContext, type SubmenuContextValue } from "./submenu-context";
import { useSubmenuOpenState } from "./use-submenu-open-state";

export type { SubmenuContextValue };
export { SubmenuContext };

export function useSubmenu(component = "SidebarMenu.Submenu.*") {
  const context = useContext(SubmenuContext);

  if (!context) {
    throw new Error(`${component} must be used within SidebarMenu.Submenu`);
  }

  return context;
}

interface SidebarMenuSubmenuProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function SidebarMenuSubmenu({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
}: SidebarMenuSubmenuProps) {
  const { value, onHasActiveChange } = useSubmenuOpenState({
    open,
    defaultOpen,
    onOpenChange,
  });

  return (
    <SubmenuContext.Provider value={value}>
      <ActiveChildRegistryProvider onHasActiveChange={onHasActiveChange}>
        <li
          data-sidebar-submenu=""
          data-state={value.open ? "open" : "closed"}
          className={className}
        >
          {children}
        </li>
      </ActiveChildRegistryProvider>
    </SubmenuContext.Provider>
  );
}
