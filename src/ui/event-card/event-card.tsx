import * as stylex from '@stylexjs/stylex';
import { spacing, globalTokens as $, text } from '~/global-tokens.stylex';
import { WikiEvent } from '~/schemas/wiki-event';
import { WikiPage } from '~/schemas/wiki-page';
import { EventCardContext, useEventCardContext } from '~/ui/event-card';
import { PageCard } from '~/ui/page-card/page-card';
import {
  Paginator,
  PaginatorEntriesProps,
  PaginatorProps,
} from '~/ui/paginator';
import { Timeline } from '~/ui/timeline';

export type EventCardProps = {
  event: WikiEvent;
} & React.PropsWithChildren;

export function EventCard({ event, children }: EventCardProps) {
  return (
    <EventCardContext.Provider value={{ event }}>
      <div {...stylex.props(styles.eventCard)}>{children}</div>
    </EventCardContext.Provider>
  );
}

EventCard.Timeline = function EventCardTimeline() {
  const { event } = useEventCardContext();

  return (
    <Timeline>
      <Timeline.Item>{event.year}</Timeline.Item>
    </Timeline>
  );
};

EventCard.Title = function EventCardTitle() {
  const { event } = useEventCardContext();

  return <h3 title={event.text}>{event.text}</h3>;
};

type EventCardPaginatorProps = {} & Omit<PaginatorProps<WikiPage>, 'entries'>;

function EventCardPaginator(props: EventCardPaginatorProps) {
  const { event } = useEventCardContext();

  return <Paginator<WikiPage> entries={event.pages} {...props} />;
}

type EventCardPaginatorEntriesProps = {
  children?: ({ page }: { page: WikiPage }) => React.JSX.Element;
} & Omit<PaginatorEntriesProps<WikiPage>, 'children'>;

EventCardPaginator.Entries = function EventCardPaginatorEntries({
  children,
  ...props
}: EventCardPaginatorEntriesProps) {
  return (
    <Paginator.Entries<WikiPage> {...props}>
      {({ entry: page }) =>
        children ? (
          children({ page })
        ) : (
          <PageCard page={page}>
            <PageCard.Content>
              <PageCard.Title />
              <PageCard.Description />
              <PageCard.Thumbnail />
            </PageCard.Content>
          </PageCard>
        )
      }
    </Paginator.Entries>
  );
};

EventCardPaginator.Pages = Paginator.Pages;

EventCard.Paginator = EventCardPaginator;

const styles = stylex.create({
  eventCard: {
    display: 'flex',
    flexDirection: 'row',
  },
});
