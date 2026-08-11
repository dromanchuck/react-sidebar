import { useEffect, useState } from 'react'

/**
 * Tracks whether a CSS media query currently matches the viewport.
 */
export function useViewportMatch(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const sync = (event?: MediaQueryListEvent) => {
      setMatches(event ? event.matches : mq.matches)
    }

    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [query])

  return matches
}
