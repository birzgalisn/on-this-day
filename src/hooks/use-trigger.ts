import { useEffect, useState } from 'react';

export function useTrigger(trigger = false) {
  const [state, setState] = useState<boolean>(() => trigger);

  const toggle = (isTruthy?: boolean) => setState((prev) => isTruthy ?? !prev);

  useEffect(() => setState(trigger), [trigger]);

  return [state, toggle] as const;
}
