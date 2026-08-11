import { createContext, useContext } from "react";

export interface BottomSheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
  titleId: string;
}

export const BottomSheetContext = createContext<BottomSheetContextValue | null>(
  null,
);

export function useBottomSheetContext(component: string) {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error(`${component} must be used within BottomSheet`);
  }

  return context;
}
