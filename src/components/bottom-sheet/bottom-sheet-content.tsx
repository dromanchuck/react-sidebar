import { useCallback, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useDialogFocusGuard } from "@/hooks/use-dialog-focus-guard";
import { useBottomSheetContext } from "./bottom-sheet-context";

interface BottomSheetContentProps {
  children: ReactNode;
  backdrop?: ReactNode;
}

export function BottomSheetContent({
  children,
  backdrop,
}: BottomSheetContentProps) {
  const { open, setOpen, contentId, titleId } = useBottomSheetContext(
    "BottomSheet.Content",
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const onDismiss = useCallback(() => setOpen(false), [setOpen]);

  useDialogFocusGuard(open, panelRef, onDismiss);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <>
      {backdrop ?? (
        <div
          data-bottom-sheet-backdrop=""
          onClick={onDismiss}
          aria-hidden="true"
        />
      )}
      <div
        ref={panelRef}
        id={contentId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-bottom-sheet-content=""
        data-state={open ? "open" : "closed"}
      >
        {children}
      </div>
    </>,
    document.body,
  );
}
