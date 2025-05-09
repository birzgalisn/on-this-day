import { createContext, useContext } from 'react';
import { WikiOnThisDayType } from '~/schemas/wiki-on-this-day';
import { WikiEvent } from '~/schemas/wiki-event';

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
