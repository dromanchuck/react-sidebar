import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

interface CollapsedFlyoutProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
  triggerId: string;
  triggerRef: RefObject<HTMLElement | null>;
  openWithHover: () => void;
  closeWithHover: () => void;
  cancelHoverTimers: () => void;
  children: ReactNode;
}

export function CollapsedFlyout({
  open,
  setOpen,
  contentId,
  triggerId,
  triggerRef,
  openWithHover,
  closeWithHover,
  cancelHoverTimers,
  children,
}: CollapsedFlyoutProps) {
  const panelRef = useRef<HTMLUListElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) {
      return;
    }

    const rect = triggerRef.current.getBoundingClientRect();
    setStyle({
      position: "fixed",
      top: rect.top,
      left: rect.right + 8,
      zIndex: 50,
    });
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);

    const firstLink = panelRef.current?.querySelector<HTMLElement>(
      "a, button, [data-sidebar-link]",
    );
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, setOpen, triggerRef]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <ul
      ref={panelRef}
      id={contentId}
      role="menu"
      aria-labelledby={triggerId}
      data-sidebar-submenu-content=""
      data-mode="collapsed"
      style={{ ...style, listStyle: "none", margin: 0, padding: 0 }}
      onMouseEnter={() => {
        cancelHoverTimers();
        openWithHover();
      }}
      onMouseLeave={closeWithHover}
    >
      {children}
    </ul>,
    document.body,
  );
}
