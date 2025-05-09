import { createContext, useContext } from 'react';
import { WikiPage } from '~/schemas/wiki-page';

export const PageCardContext = createContext<{
  page: WikiPage;
} | null>(null);

export function usePageCardContext() {
  const pageContext = useContext(PageCardContext);

  if (!pageContext) {
    throw new Error('`usePageCardContext` must be used within a `PageCard.*`');
  }

  return pageContext;
}
