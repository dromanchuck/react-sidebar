type Preventable = { defaultPrevented: boolean };

/**
 * Builds a single listener that runs `first` then `second`,
 * skipping `second` when the event was already cancelled.
 */
export function sequenceHandlers<E extends Preventable>(
  first: ((event: E) => void) | undefined,
  second: (event: E) => void,
) {
  return (event: E) => {
    first?.(event);
    if (!event.defaultPrevented) {
      second(event);
    }
  };
}
