import { useEffect, useState } from 'react';

export function useTrigger(trigger?: boolean) {
  const [state, setState] = useState<boolean>();

  const toggle = (isTruthy?: boolean) => setState((prev) => isTruthy ?? !prev);

  useEffect(() => setState(trigger), [trigger]);

  return [state, toggle] as const;
}
