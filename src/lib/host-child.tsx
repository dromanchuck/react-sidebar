import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { applyRefs } from "@/lib/apply-refs";
import { sequenceHandlers } from "@/lib/sequence-handlers";

type HostProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
};

/**
 * Renders the single child element and overlays host props onto it.
 * Used so BottomSheet triggers can be native buttons or custom elements.
 */
export function HostChild({ children, ref, ...hostProps }: HostProps) {
  const only = Children.only(children);
  if (!isValidElement(only)) {
    return null;
  }

  const child = only as ReactElement<
    Record<string, unknown> & {
      ref?: Ref<HTMLElement>;
      onClick?: (event: { defaultPrevented: boolean }) => void;
    }
  >;

  const nextProps: Record<string, unknown> = { ...hostProps };

  for (const [key, childValue] of Object.entries(child.props)) {
    if (key === "children") {
      continue;
    }

    const hostValue = hostProps[key as keyof typeof hostProps];
    if (
      key.startsWith("on") &&
      typeof childValue === "function" &&
      typeof hostValue === "function"
    ) {
      nextProps[key] = sequenceHandlers(
        childValue as (event: { defaultPrevented: boolean }) => void,
        hostValue as (event: { defaultPrevented: boolean }) => void,
      );
      continue;
    }

    if (nextProps[key] === undefined) {
      nextProps[key] = childValue;
    }
  }

  const childRef = (child as { ref?: Ref<HTMLElement> }).ref;
  nextProps.ref = applyRefs(ref, childRef);

  return cloneElement(child, nextProps);
}
