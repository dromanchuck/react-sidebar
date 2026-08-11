import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSidebarMenu, type SidebarMode } from "./sidebar-menu-context";

export type TooltipEnabled = boolean | "collapsed";

export interface SidebarTooltipRenderProps {
  open: boolean;
  enabled: boolean;
  mode: SidebarMode;
  triggerProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
    "aria-describedby"?: string;
  };
  contentProps: {
    id: string;
    role: "tooltip";
    "data-sidebar-tooltip": "";
    "data-state": "open" | "closed";
  };
}

interface SidebarMenuTooltipProps {
  children: (props: SidebarTooltipRenderProps) => ReactNode;
  /** `'collapsed'` (default) | always `true` | never `false`. */
  enabled?: TooltipEnabled;
  disabled?: boolean;
  openDelay?: number;
  closeDelay?: number;
}

function resolveEnabled(enabled: TooltipEnabled, mode: SidebarMode) {
  if (enabled === "collapsed") {
    return mode === "collapsed";
  }
  return enabled;
}

export function SidebarMenuTooltip({
  children,
  enabled = "collapsed",
  disabled = false,
  openDelay = 350,
  closeDelay = 80,
}: SidebarMenuTooltipProps) {
  const { mode } = useSidebarMenu("SidebarMenu.Tooltip");
  const canShow = resolveEnabled(enabled, mode) && !disabled;
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const show = useCallback(() => {
    if (!canShow) {
      return;
    }
    clearTimers();
    openTimer.current = setTimeout(() => setOpen(true), openDelay);
  }, [canShow, clearTimers, openDelay]);

  const hide = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay);
  }, [clearTimers, closeDelay]);

  useEffect(() => {
    if (!canShow) {
      clearTimers();
      setOpen(false);
    }
  }, [canShow, clearTimers]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const visible = canShow && open;

  return (
    <>
      {children({
        open: visible,
        enabled: canShow,
        mode,
        triggerProps: {
          onMouseEnter: show,
          onMouseLeave: hide,
          onFocus: show,
          onBlur: hide,
          "aria-describedby": visible ? tooltipId : undefined,
        },
        contentProps: {
          id: tooltipId,
          role: "tooltip",
          "data-sidebar-tooltip": "",
          "data-state": visible ? "open" : "closed",
        },
      })}
    </>
  );
}
