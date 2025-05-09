import * as stylex from '@stylexjs/stylex';
import { spacing, globalTokens as $, text } from '~/global-tokens.stylex';
import {
  ArticleCardContext,
  useArticleCardContext,
} from '~/ui/article-card/article-card-context';
import {
  Paginator,
  PaginatorEntriesProps,
  PaginatorProps,
} from '~/ui/paginator';
import { EventCard } from '~/ui/event-card';
import { WikiOnThisDayType } from '~/schemas/wiki-on-this-day';
import { WikiEvent } from '~/schemas/wiki-event';
import { WIKI_ON_THIS_DAY_TYPE_MAP } from '~/constants/wiki-on-this-day-type-map';

export type ArticleCardProps = {
  type: WikiOnThisDayType;
  entries: WikiEvent[];
} & React.PropsWithChildren;

export function ArticleCard({ type, entries, children }: ArticleCardProps) {
  return (
    <ArticleCardContext.Provider value={{ type, entries }}>
      <article {...stylex.props(styles.article)}>{children}</article>
    </ArticleCardContext.Provider>
  );
}

ArticleCard.Title = function ArticleCardTitle() {
  const { type } = useArticleCardContext();
  const title = WIKI_ON_THIS_DAY_TYPE_MAP[type];

  return (
    <h2 title={title} {...stylex.props(styles.title)}>
      {title}
    </h2>
  );
};

export type ArticleCardPaginatorProps = {} & Omit<
  PaginatorProps<WikiEvent>,
  'entries'
>;

function ArticleCardPaginator(props: ArticleCardPaginatorProps) {
  const { entries } = useArticleCardContext();

  return <Paginator<WikiEvent> entries={entries} {...props} />;
}

export type ArticleCardPaginatorEntriesProps = {
  children?: ({ event }: { event: WikiEvent }) => React.JSX.Element;
} & Omit<PaginatorEntriesProps<WikiEvent>, 'children'>;

ArticleCardPaginator.Entries = function ArticleCardPaginatorEntries({
  children,
  ...props
}: ArticleCardPaginatorEntriesProps) {
  return (
    <Paginator.Entries<WikiEvent> {...props}>
      {({ entry: event }) =>
        children ? (
          children({ event })
        ) : (
          <EventCard event={event}>
            <EventCard.Timeline />
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
ArticleCardPaginator.More = Paginator.More;

ArticleCard.Paginator = ArticleCardPaginator;

const styles = stylex.create({
  article: {
    display: 'flex',
    flexDirection: 'column',
    padding: {
      default: spacing.md,
    },
  },
  title: {
    fontFamily: $.fontSans,
    fontSize: text.h2,
  },
});
