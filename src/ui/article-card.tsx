import {
  ArticleCardContext,
  useArticleCardContext,
} from './article-card-context';
import { Paginator, PaginatorProps } from './paginator';
import { EventCard } from './event-card';
import { WikiOnThisDayType } from '../schema/wiki-on-this-day';
import { WikiEvent } from '../schema/wiki-event';
import { WIKI_ON_THIS_DAY_TYPE_MAP } from '../constants/wiki-on-this-day-type-map';

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

ArticleCard.Entries = function ArticleCardEntries({
  children,
  ...props
}: {
  children?: ({ event }: { event: WikiEvent }) => React.JSX.Element;
} & Omit<PaginatorProps<WikiEvent>, 'entries' | 'children'>) {
  const { entries } = useArticleCardContext();

  return (
    <Paginator entries={entries} {...props}>
      <Paginator.Entries<WikiEvent>>
        {({ entry: event }) =>
          children ? (
            children({ event })
          ) : (
            <EventCard event={event}>
              <EventCard.Title />
              <EventCard.Entries />
            </EventCard>
          )
        }
      </Paginator.Entries>
      <Paginator.Pages />
    </Paginator>
  );
};
