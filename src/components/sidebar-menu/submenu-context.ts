import { createContext, type RefObject } from "react";

export interface SubmenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
  triggerId: string;
  hasActiveChild: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  openWithHover: () => void;
  closeWithHover: () => void;
  cancelHoverTimers: () => void;
}

export const SubmenuContext = createContext<SubmenuContextValue | null>(null);
