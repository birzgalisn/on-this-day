import * as stylex from '@stylexjs/stylex';
import { spacing } from '~/global-tokens.stylex';
import { useOnThisDayQuery } from '~/features/on-this-day/hooks/use-on-this-day-query';
import { useOnThisDayPagination } from '~/features/on-this-day/hooks/use-on-this-day-pagination';
import { OnThisDayErrorModal } from '~/features/on-this-day/components/on-this-day-error-modal';
import { useTrigger } from '~/hooks/use-trigger';
import { Notification } from '~/ui/notification/notification';
import { ArticleCard, ArticleCardSkeleton } from '~/ui/article-card';
import { useOnThisDaySelector } from '../hooks/use-on-this-day-selector';
import { selectOnThisDayParamsType } from '../selectors/select-on-this-day-params-type';

export function OnThisDayContent() {
  const type = useOnThisDaySelector(selectOnThisDayParamsType);

  const result = useOnThisDayQuery();

  const [isErrorVisible, toggleErrorVisibility] = useTrigger(result.isError);

  if (isErrorVisible) {
    return (
      <OnThisDayErrorModal
        error={result.error}
        onClick={() => {
          toggleErrorVisibility(false);
          void result.refetch();
        }}
      />
    );
  }

  if (result.isSkeleton) {
    return <ArticleCardSkeleton />;
  }

  if (result.isEmpty) {
    return (
      <Notification type="info">No events found for today's date</Notification>
    );
  }

  if (result.isRenderable && result.entries) {
    return (
      <section {...stylex.props(styles.section)}>
        <ArticleCard key={type} {...{ type, entries: result.entries }}>
          {/* eslint-disable-next-line react-compiler/react-compiler */}
          <ArticleCard.Paginator usePagination={useOnThisDayPagination}>
            <ArticleCard.Paginator.More direction="previous">
              {() => {
                return (
                  <div>
                    <h4>Previous</h4>
                  </div>
                );
              }}
            </ArticleCard.Paginator.More>
            <ArticleCard.Paginator.Entries />
            <ArticleCard.Paginator.More direction="next">
              {() => {
                return (
                  <div>
                    <h4>Next</h4>
                  </div>
                );
              }}
            </ArticleCard.Paginator.More>
          </ArticleCard.Paginator>
        </ArticleCard>
      </section>
    );
  }

  return null;
}

const styles = stylex.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    overflow: 'auto',
  },
});
