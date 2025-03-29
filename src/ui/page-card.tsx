import { PageCardContext, usePageCardContext } from './page-card-context';
import { WikiPage } from '../schema/wiki-page';

export type PageCardProps = {
  page: WikiPage;
} & React.HTMLProps<HTMLDivElement>;

export function PageCard({
  page,
  className = '',
  children,
  ...props
}: PageCardProps) {
  return (
    <PageCardContext.Provider value={{ page }}>
      <div className={`container row ${className}`} {...props}>
        {children}
      </div>
    </PageCardContext.Provider>
  );
}

PageCard.Thumbnail = function PageCardThumbnail({
  className = '',
  ...props
}: Omit<React.HTMLProps<HTMLImageElement>, 'children'>) {
  const { page } = usePageCardContext();

  return (
    <img
      className={`thumbnail ${className}`}
      src={page.thumbnail?.source || '/placeholder.svg'}
      alt={`${page.title} thumbnail`}
      {...props}
    />
  );
};

PageCard.Content = function PageCardContent({
  className = '',
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return <div className={`list column ${className}`} {...props} />;
};

PageCard.Title = function PageCardTitle({
  className = '',
  ...props
}: Omit<React.HTMLProps<HTMLHeadingElement>, 'children'>) {
  const { page } = usePageCardContext();

  return (
    <h3
      className={`title line-clamp line-clamp--single ${className}`}
      title={page.normalizedtitle}
      {...props}
    >
      {page.normalizedtitle}
    </h3>
  );
};

PageCard.Description = function PageCardDescription({
  className = '',
  ...props
}: Omit<React.HTMLProps<HTMLParagraphElement>, 'children'>) {
  const { page } = usePageCardContext();

  return (
    <p
      className={`paragraph line-clamp line-clamp--double ${className}`}
      title={page.extract}
      {...props}
    >
      {page.extract}
    </p>
  );
};
