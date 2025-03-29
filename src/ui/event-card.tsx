import React from 'react';
import { EventCardContext, useEventCardContext } from './event-card-context';
import { PageCard } from './page-card';
import { Paginator } from './paginator';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/page';
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

EventCard.Pages = function EventCardPages({
  children,
  className = '',
  ...props
}: { children?: ({ page }: { page: WikiPage }) => React.ReactNode } & Omit<
  React.HTMLProps<HTMLDivElement>,
  'children'
>) {
  const [page, setPage] = React.useState(DEFAULT_PAGE);

  const { event } = useEventCardContext();

  const size = DEFAULT_PAGE_SIZE;
  const total = Math.ceil(event.pages.length / size);

  return (
    <>
      <div className={`list column ${className}`} {...props}>
        {event.pages
          .slice((page - 1) * size, (page - 1) * size + size)
          .map((page) => (
            <React.Fragment key={page.wikibase_item}>
              {children ? (
                children({ page })
              ) : (
                <PageCard page={page}>
                  <PageCard.Thumbnail />
                  <PageCard.Content>
                    <PageCard.Title />
                    <PageCard.Description />
                  </PageCard.Content>
                </PageCard>
              )}
            </React.Fragment>
          ))}
      </div>

      <Paginator page={page} total={total} onChange={setPage} />
    </>
  );
};
