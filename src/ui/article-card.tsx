import {
  ArticleCardContext,
  useArticleCardContext,
} from './article-card-context';
import { Paginator, PaginatorEntriesProps, PaginatorProps } from './paginator';
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

function ArticleCardPaginator(
  props: Omit<PaginatorProps<WikiEvent>, 'entries'>,
) {
  const { entries } = useArticleCardContext();

  return <Paginator<WikiEvent> entries={entries} {...props} />;
}

ArticleCardPaginator.Entries = function ArticleCardPaginatorEntries({
  children,
  ...props
}: {
  children?: ({ event }: { event: WikiEvent }) => React.JSX.Element;
} & Omit<PaginatorEntriesProps<WikiEvent>, 'children'>) {
  return (
    <Paginator.Entries<WikiEvent> {...props}>
      {({ entry: event }) =>
        children ? (
          children({ event })
        ) : (
          <EventCard event={event}>
            <EventCard.Title />
            <EventCard.Paginator>
              <EventCard.Paginator.Entries />
              <EventCard.Paginator.Pages />
            </EventCard.Paginator>
          </EventCard>
        )
      }
    </Paginator.Entries>
  );
};

ArticleCardPaginator.Pages = Paginator.Pages;

ArticleCard.Paginator = ArticleCardPaginator;
