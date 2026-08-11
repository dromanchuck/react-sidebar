import { useId, useMemo, type ReactNode } from "react";
import { useSyncedState } from "@/hooks/use-synced-state";
import { BottomSheetContext } from "./bottom-sheet-context";

interface BottomSheetProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function BottomSheetRoot({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: BottomSheetProps) {
  const [open = false, setOpen] = useSyncedState({
    value: openProp,
    initial: defaultOpen,
    onChange: onOpenChange,
  });
  const contentId = useId();
  const titleId = useId();

  const value = useMemo(
    () => ({
      open,
      setOpen,
      contentId,
      titleId,
    }),
    [open, setOpen, contentId, titleId],
  );

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
}
