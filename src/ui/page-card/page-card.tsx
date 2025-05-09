import * as stylex from '@stylexjs/stylex';
import { IMAGE_FALLBACK } from '~/constants/image';
import { WikiPage } from '~/schemas/wiki-page';
import {
  PageCardContext,
  usePageCardContext,
} from '~/ui/page-card/page-card-context';

export type PageCardProps = {
  page: WikiPage;
} & React.PropsWithChildren;

export function PageCard({ page, children }: PageCardProps) {
  return (
    <PageCardContext.Provider value={{ page }}>
      <div {...stylex.props(styles.pageCard)}>{children}</div>
    </PageCardContext.Provider>
  );
}

PageCard.Thumbnail = function PageCardThumbnail() {
  const { page } = usePageCardContext();

  return (
    <img
      src={page.thumbnail?.source || IMAGE_FALLBACK}
      alt={`${page.title} thumbnail`}
    />
  );
};

type PageCardContentProps = {} & React.PropsWithChildren;

PageCard.Content = function PageCardContent({
  ...props
}: PageCardContentProps) {
  return <div {...props} />;
};

PageCard.Title = function PageCardTitle() {
  const { page } = usePageCardContext();

  return <h3 title={page.normalizedtitle}>{page.normalizedtitle}</h3>;
};

PageCard.Description = function PageCardDescription() {
  const { page } = usePageCardContext();

  return <p title={page.extract}>{page.extract}</p>;
};

const styles = stylex.create({
  pageCard: {
    display: 'flex',
    flexDirection: 'row',
  },
});
