import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import type { SidebarMode } from "@/components/sidebar-menu";
import { cn } from "./cn";

interface NavItemLabelProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  mode: SidebarMode;
  hasChevron?: boolean;
  isOpen?: boolean;
  iconOnly?: boolean;
}

export function NavItemLabel({
  icon: Icon,
  label,
  isActive,
  mode,
  hasChevron = false,
  isOpen = false,
  iconOnly = false,
}: NavItemLabelProps) {
  const showLabel = !iconOnly && mode === "wide";

  return (
    <span
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-accent-soft",
        isActive ? "bg-accent-soft text-accent" : "text-stone-800",
        iconOnly && "flex-col gap-1 px-2 py-1.5 text-[10px] font-normal",
      )}
    >
      <Icon
        className={cn("size-5 shrink-0", isActive && "text-accent")}
        aria-hidden
      />
      {showLabel && <span className="flex-1 truncate text-left">{label}</span>}
      {iconOnly && <span className="truncate">{label}</span>}
      {showLabel && hasChevron && (
        <ChevronDown
          className={cn(
            "size-4 shrink-0 transition-transform",
            isOpen && "rotate-180",
            isActive && "text-accent",
          )}
          aria-hidden
        />
      )}
    </span>
  );
}
