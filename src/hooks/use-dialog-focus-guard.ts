import { useEffect, useRef } from 'react'

function listTabbables(root: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter((node) => {
    if (node.hasAttribute('disabled')) {
      return false
    }
    return node.getClientRects().length > 0
  })
}

/**
 * While active, keeps keyboard focus inside `containerRef` and restores it on cleanup.
 * Escape invokes `onDismiss`.
 */
export function useDialogFocusGuard(
  active: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
  onDismiss: () => void,
) {
  const restoreFocusTo = useRef<HTMLElement | null>(null)
  const dismissRef = useRef(onDismiss)
  dismissRef.current = onDismiss

  useEffect(() => {
    if (!active) {
      return
    }

    const panel = containerRef.current
    if (!panel) {
      return
    }

    restoreFocusTo.current = document.activeElement as HTMLElement | null
    const priorOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const tabbables = listTabbables(panel)
    tabbables[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        dismissRef.current()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const cycle = listTabbables(panel)
      if (cycle.length === 0) {
        event.preventDefault()
        return
      }

      const head = cycle[0]
      const tail = cycle[cycle.length - 1]
      const focused = document.activeElement

      if (event.shiftKey && focused === head) {
        event.preventDefault()
        tail.focus()
      } else if (!event.shiftKey && focused === tail) {
        event.preventDefault()
        head.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = priorOverflow
      document.removeEventListener('keydown', onKeyDown)
      restoreFocusTo.current?.focus?.()
    }
  }, [active, containerRef])
}
