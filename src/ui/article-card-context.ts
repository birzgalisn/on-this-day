import { createContext, useContext } from 'react';
import { WikiOnThisDayType } from '~/schema/wiki-on-this-day';
import { WikiEvent } from '~/schema/wiki-event';

export const ArticleCardContext = createContext<{
  type: WikiOnThisDayType;
  entries: WikiEvent[];
} | null>(null);

export function useArticleCardContext() {
  const articleContext = useContext(ArticleCardContext);

  if (!articleContext) {
    throw new Error(
      '`useArticleCardContext` must be used within a `ArticleCard.*`',
    );
  }

  return articleContext;
}
