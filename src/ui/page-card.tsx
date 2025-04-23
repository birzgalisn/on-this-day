import { WikiPage } from '~/schema/wiki-page';
import { PageCardContext, usePageCardContext } from '~/ui/page-card-context';

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

type PageCardThumbnailProps = {} & Omit<
  React.HTMLProps<HTMLImageElement>,
  'children'
>;

PageCard.Thumbnail = function PageCardThumbnail({
  className = '',
  ...props
}: PageCardThumbnailProps) {
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

type PageCardContentProps = {} & React.HTMLProps<HTMLDivElement>;

PageCard.Content = function PageCardContent({
  className = '',
  ...props
}: PageCardContentProps) {
  return <div className={`list column ${className}`} {...props} />;
};

type PageCardTitleProps = {} & Omit<
  React.HTMLProps<HTMLHeadingElement>,
  'children'
>;

PageCard.Title = function PageCardTitle({
  className = '',
  ...props
}: PageCardTitleProps) {
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

type PageCardDescriptionProps = {} & Omit<
  React.HTMLProps<HTMLParagraphElement>,
  'children'
>;

PageCard.Description = function PageCardDescription({
  className = '',
  ...props
}: PageCardDescriptionProps) {
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
