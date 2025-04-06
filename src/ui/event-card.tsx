import { EventCardContext, useEventCardContext } from './event-card-context';
import { PageCard } from './page-card';
import { Paginator, PaginatorEntriesProps, PaginatorProps } from './paginator';
import { WikiEvent } from '../schema/wiki-event';
import { WikiPage } from '../schema/wiki-page';

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

EventCard.Title = function EventCardTitle({
  className = '',
  ...props
}: Omit<React.HTMLProps<HTMLHeadingElement>, 'children'>) {
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

function EventCardPaginator(props: Omit<PaginatorProps<WikiPage>, 'entries'>) {
  const { event } = useEventCardContext();

  return <Paginator<WikiPage> entries={event.pages} {...props} />;
}

EventCardPaginator.Entries = function EventCardPaginatorEntries({
  children,
  ...props
}: {
  children?: ({ page }: { page: WikiPage }) => React.JSX.Element;
} & Omit<PaginatorEntriesProps<WikiPage>, 'children'>) {
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
