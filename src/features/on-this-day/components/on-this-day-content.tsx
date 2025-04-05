import { useOnThisDay } from '../hooks/use-on-this-day';
import { OnThisDayErrorModal } from './on-this-day-error-modal';
import { useTrigger } from '../../../hooks/use-trigger';
import { Button } from '../../../ui/button';
import { ArticleCard } from '../../../ui/article-card';
import { ArticleCardSkeleton } from '../../../ui/article-card-skeleton';
import { Notification } from '../../../ui/notification';
import { useOnThisDayPage } from '../hooks/use-on-this-day-page';

export function OnThisDayContent() {
  const [fetchTodaysEvents, result] = useOnThisDay();

  const [isErrorVisible, toggleErrorVisibility] = useTrigger(result.isError);

  if (isErrorVisible) {
    return (
      <OnThisDayErrorModal
        error={result.error}
        onClick={() => toggleErrorVisibility(false)}
      />
    );
  }

  if (result.isQueryable) {
    return (
      <Button disabled={result.isFetching} onClick={() => fetchTodaysEvents()}>
        What happened on this day?
      </Button>
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

  return (
    <section className={`full-width ${result.isFetching ? 'pulse' : ''}`}>
      {result.entries.map(([type, entries]) => (
        <ArticleCard key={type} {...{ type, entries }}>
          <ArticleCard.Title />
          <ArticleCard.Entries usePage={useOnThisDayPage} />
        </ArticleCard>
      ))}
    </section>
  );
}
