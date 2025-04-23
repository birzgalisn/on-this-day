import { createContext, useContext } from 'react';
import { WikiEvent } from '~/schema/wiki-event';

export const EventCardContext = createContext<{
  event: WikiEvent;
} | null>(null);

export function useEventCardContext() {
  const eventContext = useContext(EventCardContext);

  if (!eventContext) {
    throw new Error(
      '`useEventCardContext` must be used within a `EventCard.*`',
    );
  }

  return eventContext;
}
