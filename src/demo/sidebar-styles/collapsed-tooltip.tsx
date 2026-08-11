import type { ReactNode } from "react";
import { SidebarMenu } from "@/components/sidebar-menu";
import { cn } from "./cn";

interface CollapsedTooltipProps {
  label: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

/** Demo tooltip UI for collapsed mode — restyle freely via className / markup. */
export function CollapsedTooltip({
  label,
  children,
  disabled,
  className,
}: CollapsedTooltipProps) {
  return (
    <SidebarMenu.Tooltip disabled={disabled}>
      {({ open, enabled, triggerProps, contentProps }) => (
        <span className={cn("relative block", className)} {...triggerProps}>
          {children}
          {enabled && open ? (
            <span
              {...contentProps}
              className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-accent px-2 py-1 text-xs font-medium text-white shadow-md"
            >
              {label}
            </span>
          ) : null}
        </span>
      )}
    </SidebarMenu.Tooltip>
  );
}
