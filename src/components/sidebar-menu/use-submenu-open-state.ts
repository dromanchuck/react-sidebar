import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSyncedState } from "@/hooks/use-synced-state";
import { useSidebarMenu, type SidebarMode } from "./sidebar-menu-context";
import type { SubmenuContextValue } from "./submenu-context";

const HOVER_OPEN_DELAY = 80;
const HOVER_CLOSE_DELAY = 150;
const HOVER_SUPPRESS_MS = 400;

interface UseSubmenuOpenStateParams {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface UseSubmenuOpenStateResult {
  value: SubmenuContextValue;
  onHasActiveChange: (hasActive: boolean) => void;
}

/** Inline open (wide) vs overlay open (flyout/sheet) stay separate so collapse never reopens a flyout. */
export function useSubmenuOpenState({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: UseSubmenuOpenStateParams): UseSubmenuOpenStateResult {
  const { mode } = useSidebarMenu("SidebarMenu.Submenu");
  const isControlled = openProp !== undefined;

  const [inlineOpen = false, setInlineOpenState] = useSyncedState({
    value: openProp,
    initial: defaultOpen,
    onChange: onOpenChange,
  });

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [hasActiveChild, setHasActiveChild] = useState(false);

  const contentId = useId();
  const triggerId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userDismissedRef = useRef(false);
  const prevHasActiveChildRef = useRef(false);
  const prevModeRef = useRef<SidebarMode>(mode);
  const hoverSuppressedRef = useRef(false);
  const hoverSuppressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = mode === "wide" ? inlineOpen : overlayOpen;

  const cancelHoverTimers = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const suppressHoverTemporarily = useCallback(() => {
    hoverSuppressedRef.current = true;
    if (hoverSuppressTimer.current) {
      clearTimeout(hoverSuppressTimer.current);
    }
    hoverSuppressTimer.current = setTimeout(() => {
      hoverSuppressedRef.current = false;
      hoverSuppressTimer.current = null;
    }, HOVER_SUPPRESS_MS);
  }, []);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!next && hasActiveChild) {
        userDismissedRef.current = true;
      }
      if (next) {
        userDismissedRef.current = false;
      }

      if (mode === "wide") {
        setInlineOpenState(next);
      } else {
        setOverlayOpen(next);
        if (isControlled) {
          onOpenChange?.(next);
        }
      }
    },
    [hasActiveChild, isControlled, mode, onOpenChange, setInlineOpenState],
  );

  const openWithHover = useCallback(() => {
    if (hoverSuppressedRef.current || mode !== "collapsed") {
      return;
    }
    cancelHoverTimers();
    openTimer.current = setTimeout(() => setOpen(true), HOVER_OPEN_DELAY);
  }, [cancelHoverTimers, mode, setOpen]);

  const closeWithHover = useCallback(() => {
    cancelHoverTimers();
    closeTimer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY);
  }, [cancelHoverTimers, setOpen]);

  useEffect(() => {
    const becameActive = hasActiveChild && !prevHasActiveChildRef.current;
    prevHasActiveChildRef.current = hasActiveChild;

    if (!hasActiveChild) {
      userDismissedRef.current = false;
      return;
    }

    if (
      becameActive &&
      !isControlled &&
      mode === "wide" &&
      !userDismissedRef.current
    ) {
      setInlineOpenState(true);
    }
  }, [hasActiveChild, isControlled, mode, setInlineOpenState]);

  useLayoutEffect(() => {
    if (prevModeRef.current === mode) {
      return;
    }

    prevModeRef.current = mode;
    cancelHoverTimers();
    suppressHoverTemporarily();
    setOverlayOpen(false);

    if (
      mode === "wide" &&
      !isControlled &&
      hasActiveChild &&
      !userDismissedRef.current
    ) {
      setInlineOpenState(true);
    }
  }, [
    mode,
    cancelHoverTimers,
    suppressHoverTemporarily,
    isControlled,
    hasActiveChild,
    setInlineOpenState,
  ]);

  useEffect(
    () => () => {
      cancelHoverTimers();
      if (hoverSuppressTimer.current) {
        clearTimeout(hoverSuppressTimer.current);
      }
    },
    [cancelHoverTimers],
  );

  const value = useMemo(
    () => ({
      open,
      setOpen,
      contentId,
      triggerId,
      hasActiveChild,
      triggerRef,
      openWithHover,
      closeWithHover,
      cancelHoverTimers,
    }),
    [
      open,
      setOpen,
      contentId,
      triggerId,
      hasActiveChild,
      openWithHover,
      closeWithHover,
      cancelHoverTimers,
    ],
  );

  return { value, onHasActiveChange: setHasActiveChild };
}
