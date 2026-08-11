import { useCallback, useState } from 'react'

function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

function writeStored<T>(key: string, next: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(next))
  } catch {
    // private mode / quota — ignore
  }
}

/**
 * Demo helper: React state mirrored into localStorage under `key`.
 */
export function usePersistedState<T>(key: string, fallback: T) {
  const [state, setState] = useState<T>(() =>
    typeof window === 'undefined' ? fallback : readStored(key, fallback),
  )

  const setPersisted = useCallback(
    (next: T | ((prev: T) => T)) => {
      setState((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
        writeStored(key, resolved)
        return resolved
      })
    },
    [key],
  )

  return [state, setPersisted] as const
}
