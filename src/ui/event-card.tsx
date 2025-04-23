import { WikiEvent } from '~/schema/wiki-event';
import { WikiPage } from '~/schema/wiki-page';
import { EventCardContext, useEventCardContext } from '~/ui/event-card-context';
import { PageCard } from '~/ui/page-card';
import {
  Paginator,
  PaginatorEntriesProps,
  PaginatorProps,
} from '~/ui/paginator';

export type EventCardProps = {
  event: WikiEvent;
} & React.HTMLProps<HTMLDivElement>;

export function EventCard({
  event,
  className = '',
  children,
  ...props
}: EventCardProps) {
  return (
    <EventCardContext.Provider value={{ event }}>
      <div className={`container column ${className}`} {...props}>
        {children}
      </div>
    </EventCardContext.Provider>
  );
}

type EventCardTitleProps = {} & Omit<
  React.HTMLProps<HTMLHeadingElement>,
  'children'
>;

EventCard.Title = function EventCardTitle({
  className = '',
  ...props
}: EventCardTitleProps) {
  const { event } = useEventCardContext();

  return (
    <h3
      className={`title line-clamp line-clamp--single ${className}`}
      title={event.text}
      {...props}
    >
      {event.text}
    </h3>
  );
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
            <PageCard.Thumbnail />
            <PageCard.Content>
              <PageCard.Title />
              <PageCard.Description />
            </PageCard.Content>
          </PageCard>
        )
      }
    </Paginator.Entries>
  );
};

EventCardPaginator.Pages = Paginator.Pages;

EventCard.Paginator = EventCardPaginator;
