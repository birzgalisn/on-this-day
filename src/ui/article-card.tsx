import React, { useId } from 'react';
import {
  ArticleCardContext,
  useArticleCardContext,
} from './article-card-context';
import { Paginator, PaginatorProps } from './paginator';
import { EventCard } from './event-card';
import { paginate } from '../features/on-this-day/slices/on-this-day-slice';
import { WikiOnThisDayType } from '../schema/wiki-on-this-day';
import { WikiEvent } from '../schema/wiki-event';
import { WIKI_ON_THIS_DAY_TYPE_MAP } from '../constants/wiki-on-this-day-type-map';
import { useOnThisDayDispatch } from '../features/on-this-day/hooks/use-on-this-day-dispatch';
import { useOnThisDaySelector } from '../features/on-this-day/hooks/use-on-this-day-selector';

export type ArticleCardProps = {
  type: WikiOnThisDayType;
  entries: WikiEvent[];
} & React.HTMLProps<HTMLElement>;

export function ArticleCard({
  type,
  entries,
  className = '',
  ...props
}: ArticleCardProps) {
  return (
    <ArticleCardContext.Provider value={{ type, entries }}>
      <article className={`list column ${className}`} {...props} />
    </ArticleCardContext.Provider>
  );
}

ArticleCard.Entries = function ArticleCardEntries({
  children,
  className = '',
  ...props
}: {
  children?: ({ event }: { event: WikiEvent }) => React.ReactNode;
} & Omit<React.HTMLProps<HTMLDivElement>, 'children'>) {
  const articleCardId = useId();

  const { type, entries } = useArticleCardContext();

  const pagination = useOnThisDaySelector(
    (state) => state.onThisDay.pagination[type],
  );

  if (!pagination) {
    return null;
  }

  return (
    <div className={`list column ${className}`} {...props}>
      {entries
        .slice(
          (pagination.page - 1) * pagination.size,
          (pagination.page - 1) * pagination.size + pagination.size,
        )
        .map((event, idx) => (
          <React.Fragment key={`${articleCardId}-${idx}`}>
            {children ? (
              children({ event })
            ) : (
              <EventCard event={event}>
                <EventCard.Title />
                <EventCard.Pages />
              </EventCard>
            )}
          </React.Fragment>
        ))}
    </div>
  );
};

ArticleCard.Title = function ArticleCardTitle({
  className = '',
  ...props
}: Omit<React.HTMLProps<HTMLHeadingElement>, 'children'>) {
  const { type } = useArticleCardContext();
  const title = WIKI_ON_THIS_DAY_TYPE_MAP[type];

  return (
    <h2
      className={`title line-clamp line-clamp--single ${className}`}
      title={title}
      {...props}
    >
      {title}
    </h2>
  );
};

ArticleCard.Paginator = function ArticleCardPaginator(
  props: Omit<PaginatorProps, 'page' | 'total' | 'onChange'>,
) {
  const { type } = useArticleCardContext();

  const dispatch = useOnThisDayDispatch();

  const pagination = useOnThisDaySelector(
    (state) => state.onThisDay.pagination[type],
  );

  if (!pagination) {
    return null;
  }

  return (
    <Paginator
      page={pagination.page}
      total={pagination.total}
      onChange={(page) => dispatch(paginate({ type, page }))}
      {...props}
    />
  );
};
