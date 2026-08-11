import {
  createContext,
  useContext,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";
import type { MenuKey } from "@/demo/menu-keys";

export interface NavWiringValue {
  isActive: (key: MenuKey) => boolean;
  renderNavItem: (key: MenuKey, path?: string) => ReactElement;
}

const NavWiringContext = createContext<NavWiringValue | null>(null);

export function NavWiringProvider({
  isActive,
  renderNavItem,
  children,
}: NavWiringValue & { children: ReactNode }) {
  const value = useMemo(
    () => ({ isActive, renderNavItem }),
    [isActive, renderNavItem],
  );

  return (
    <NavWiringContext.Provider value={value}>
      {children}
    </NavWiringContext.Provider>
  );
}

export function useNavWiring() {
  const ctx = useContext(NavWiringContext);
  if (!ctx) {
    throw new Error("useNavWiring must be used within NavWiringProvider");
  }
  return ctx;
}
