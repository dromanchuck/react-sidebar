import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

type Unregister = () => void;

const ActiveChildRegistryContext = createContext<
  ((isActive: boolean) => Unregister) | null
>(null);

export function ActiveChildRegistryProvider({
  children,
  onHasActiveChange,
}: {
  children: ReactNode;
  onHasActiveChange: (hasActive: boolean) => void;
}) {
  const activeCountRef = useRef(0);

  const registerLive = useCallback(
    (isActive: boolean) => {
      let active = false;

      const sync = (next: boolean) => {
        if (next === active) {
          return;
        }

        if (next) {
          activeCountRef.current += 1;
        } else {
          activeCountRef.current = Math.max(0, activeCountRef.current - 1);
        }

        active = next;
        onHasActiveChange(activeCountRef.current > 0);
      };

      sync(isActive);

      return () => {
        sync(false);
      };
    },
    [onHasActiveChange],
  );

  return (
    <ActiveChildRegistryContext.Provider value={registerLive}>
      {children}
    </ActiveChildRegistryContext.Provider>
  );
}

export function useRegisterActiveChild(isActive: boolean) {
  const register = useContext(ActiveChildRegistryContext);

  useEffect(() => {
    if (!register) {
      return;
    }

    return register(isActive);
  }, [isActive, register]);
}
