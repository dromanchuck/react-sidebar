import {
  cloneElement,
  isValidElement,
  useContext,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { useRegisterActiveChild } from "./active-child-registry";
import { useSidebarMenu, type SidebarMode } from "./sidebar-menu-context";
import { SubmenuContext } from "./submenu-context";

export interface SidebarLinkRenderProps {
  isActive: boolean;
  mode: SidebarMode;
  collapsed: boolean;
}

interface SidebarMenuLinkProps {
  isActive?: boolean;
  /** Consumer-owned host element (NavLink, button, a, …). */
  render?: ReactElement;
  children?: ReactNode | ((props: SidebarLinkRenderProps) => ReactNode);
  onSelect?: () => void;
}

export function SidebarMenuLink({
  isActive = false,
  render,
  children,
  onSelect,
}: SidebarMenuLinkProps) {
  const { mode, collapsed } = useSidebarMenu("SidebarMenu.Link");
  const submenu = useContext(SubmenuContext);
  useRegisterActiveChild(isActive);

  const content =
    typeof children === "function"
      ? children({ isActive, mode, collapsed })
      : children;

  const a11y = {
    "data-sidebar-link": "",
    "data-active": isActive ? "" : undefined,
    "data-mode": mode,
    "aria-current": (isActive ? "page" : undefined) as "page" | undefined,
  };

  const handleSelect = (event: MouseEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    onSelect?.();

    if (submenu && (mode === "mobile" || mode === "collapsed")) {
      submenu.setOpen(false);
    }
  };

  if (render && isValidElement(render)) {
    const element = render as ReactElement<
      Record<string, unknown> & {
        ref?: Ref<HTMLElement>;
        onClick?: (e: MouseEvent) => void;
      }
    >;
    const existingOnClick = element.props.onClick;
    const elementRef = (element as { ref?: Ref<HTMLElement> }).ref;

    return cloneElement(element, {
      ...a11y,
      ref: elementRef,
      onClick: (event: MouseEvent) => {
        existingOnClick?.(event);
        handleSelect(event);
      },
      children: content,
    });
  }

  return (
    <button type="button" {...a11y} onClick={handleSelect}>
      {content}
    </button>
  );
}
