import type { ReactNode } from "react";
import { HostChild } from "@/lib/host-child";
import { useBottomSheetContext } from "./bottom-sheet-context";

interface BottomSheetTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export function BottomSheetTrigger({
  children,
  asChild = false,
}: BottomSheetTriggerProps) {
  const { open, setOpen, contentId } = useBottomSheetContext(
    "BottomSheet.Trigger",
  );

  const shared = {
    "aria-expanded": open,
    "aria-controls": contentId,
    "aria-haspopup": "dialog" as const,
    onClick: () => setOpen(!open),
  };

  if (asChild) {
    return <HostChild {...shared}>{children}</HostChild>;
  }

  return (
    <button type="button" {...shared}>
      {children}
    </button>
  );
}
