import { useOnThisDay } from './hooks/use-on-this-day';
import { OnThisDayContainer } from './components/on-this-day-container';
import { OnThisDayErrorModal } from './components/on-this-day-error-modal';
import { useTrigger } from '../../hooks/use-trigger';
import { Button } from '../../ui/button';
import { ArticleCard } from '../../ui/article-card';
import { ArticleCardSkeleton } from '../../ui/article-card-skeleton';
import { Notification } from '../../ui/notification';

export function OnThisDay() {
  const [fetchTodaysEvents, result] = useOnThisDay();

  const [isErrorVisible, toggleErrorVisibility] = useTrigger(result.isError);

  return (
    <OnThisDayContainer>
      {result.isQueryable && (
        <Button
          disabled={result.isFetching}
          onClick={() => fetchTodaysEvents()}
        >
          What happened on this day?
        </Button>
      )}

      {result.isSkeleton && <ArticleCardSkeleton />}

      {isErrorVisible && (
        <OnThisDayErrorModal
          error={result.error}
          onClick={() => toggleErrorVisibility(false)}
        />
      )}

      {result.isEmpty && (
        <Notification type="info">
          No events found for today's date
        </Notification>
      )}

      {result.isRenderable && (
        <section className={`full-width ${result.isFetching ? 'pulse' : ''}`}>
          {result.entries.map(([type, entries]) => (
            <ArticleCard key={type} {...{ type, entries }}>
              <ArticleCard.Title />
              <ArticleCard.Entries />
              <ArticleCard.Paginator />
            </ArticleCard>
          ))}
        </section>
      )}
    </OnThisDayContainer>
  );
}
