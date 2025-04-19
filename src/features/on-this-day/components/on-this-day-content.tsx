import { OnThisDayArticleCard } from './on-this-day-article-card';
import { OnThisDayErrorModal } from './on-this-day-error-modal';
import { useOnThisDayQuery } from '../hooks/use-on-this-day-query';
import { useTrigger } from '../../../hooks/use-trigger';
import { ArticleCardSkeleton } from '../../../ui/article-card-skeleton';
import { Notification } from '../../../ui/notification';

export function OnThisDayContent() {
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

  if (result.isRenderable) {
    return (
      <section className={`full-width ${result.isFetching ? 'pulse' : ''}`}>
        {result.entries.map(([type, entries]) => (
          <OnThisDayArticleCard key={type} {...{ type, entries }}>
            <OnThisDayArticleCard.Title />
            <OnThisDayArticleCard.Paginator>
              <OnThisDayArticleCard.Paginator.Entries />
              <OnThisDayArticleCard.Paginator.Pages />
            </OnThisDayArticleCard.Paginator>
          </OnThisDayArticleCard>
        ))}
      </section>
    );
  }

  return null;
}
