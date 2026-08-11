import { cn } from "./cn";

interface SubItemLabelProps {
  label: string;
  isActive: boolean;
}

export function SubItemLabel({ label, isActive }: SubItemLabelProps) {
  return (
    <span
      className={cn(
        "block rounded-md py-2 pl-11 pr-3 text-sm transition-colors",
        "hover:bg-accent-soft",
        isActive ? "bg-accent-soft font-medium text-accent" : "text-stone-700",
      )}
    >
      {label}
    </span>
  );
}

interface FlyoutItemLabelProps {
  label: string;
  isActive: boolean;
}

export function FlyoutItemLabel({ label, isActive }: FlyoutItemLabelProps) {
  return (
    <span
      className={cn(
        "block whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors",
        "hover:bg-accent-soft",
        isActive ? "bg-accent-soft font-medium text-accent" : "text-stone-800",
      )}
    >
      {label}
    </span>
  );
}
