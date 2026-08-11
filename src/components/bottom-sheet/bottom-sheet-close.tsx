import type { ButtonHTMLAttributes, ReactNode } from "react";
import { HostChild } from "@/lib/host-child";
import { sequenceHandlers } from "@/lib/sequence-handlers";
import { useBottomSheetContext } from "./bottom-sheet-context";

interface BottomSheetCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  asChild?: boolean;
}

export function BottomSheetClose({
  children,
  asChild = false,
  onClick,
  ...props
}: BottomSheetCloseProps) {
  const { setOpen } = useBottomSheetContext("BottomSheet.Close");
  const handleClick = sequenceHandlers(onClick, () => setOpen(false));

  if (asChild) {
    return (
      <HostChild {...props} onClick={handleClick}>
        {children}
      </HostChild>
    );
  }

  return (
    <button type="button" {...props} onClick={handleClick}>
      {children}
    </button>
  );
}

interface BottomSheetTitleProps {
  children: ReactNode;
}

export function BottomSheetTitle({ children }: BottomSheetTitleProps) {
  const { titleId } = useBottomSheetContext("BottomSheet.Title");

  return <h2 id={titleId}>{children}</h2>;
}
