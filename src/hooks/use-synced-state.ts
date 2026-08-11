import { useCallback, useRef, useState } from 'react'

type SyncedStateOptions<T> = {
  /** Controlled value from the parent. When set, local state is ignored. */
  value?: T
  /** Initial value for uncontrolled usage. */
  initial?: T
  onChange?: (next: T) => void
}

/**
 * Keeps component state in sync with an optional controlled value.
 * Uncontrolled until `value` is provided; then the parent owns the source of truth.
 */
export function useSyncedState<T>({
  value,
  initial,
  onChange,
}: SyncedStateOptions<T>): [T | undefined, (next: T) => void] {
  const [local, setLocal] = useState(initial)
  const controlled = value !== undefined
  const current = controlled ? value : local
  const notify = useRef(onChange)
  notify.current = onChange

  const update = useCallback(
    (next: T) => {
      if (!controlled) {
        setLocal(next)
      }
      notify.current?.(next)
    },
    [controlled],
  )

  return [current, update]
}
