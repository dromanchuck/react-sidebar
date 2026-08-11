import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useSyncedState } from "@/hooks/use-synced-state";
import { useViewportMatch } from "@/hooks/use-viewport-match";

export type SidebarMode = "wide" | "collapsed" | "mobile";

export interface SidebarMenuContextValue {
  mode: SidebarMode;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  modeGeneration: number;
}

const SidebarMenuContext = createContext<SidebarMenuContextValue | null>(null);

export function useSidebarMenu(component = "SidebarMenu.*") {
  const context = useContext(SidebarMenuContext);

  if (!context) {
    throw new Error(`${component} must be used within SidebarMenu`);
  }

  return context;
}

export interface SidebarMenuProps {
  children: ReactNode;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  mobileBreakpoint?: number;
}

export function SidebarMenuRoot({
  children,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  mobileBreakpoint = 768,
}: SidebarMenuProps) {
  const [collapsed = false, setCollapsed] = useSyncedState({
    value: collapsedProp,
    initial: defaultCollapsed,
    onChange: onCollapsedChange,
  });

  const isMobile = useViewportMatch(`(max-width: ${mobileBreakpoint - 1}px)`);

  const mode: SidebarMode = isMobile
    ? "mobile"
    : collapsed
      ? "collapsed"
      : "wide";

  const modeGenerationRef = useRef(0);
  const prevModeRef = useRef(mode);

  if (prevModeRef.current !== mode) {
    prevModeRef.current = mode;
    modeGenerationRef.current += 1;
  }

  const modeGeneration = modeGenerationRef.current;

  const value = useMemo(
    () => ({
      mode,
      collapsed,
      setCollapsed,
      modeGeneration,
    }),
    [mode, collapsed, setCollapsed, modeGeneration],
  );

  return (
    <SidebarMenuContext.Provider value={value}>
      <div
        data-sidebar-menu=""
        data-mode={mode}
        data-collapsed={collapsed ? "" : undefined}
      >
        {children}
      </div>
    </SidebarMenuContext.Provider>
  );
}
