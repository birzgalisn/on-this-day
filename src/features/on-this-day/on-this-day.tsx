import { ON_THIS_DAY_ZOD_ERROR_MAP } from './constants/on-this-day-zod-error-map';
import { useOnThisDay } from './hooks/use-on-this-day';
import { OnThisDayContainer } from './components/on-this-day-container';
import { isZodError } from '../../lib/is-zod-error';
import { Button } from '../../ui/button';
import { ArticleCard } from '../../ui/article-card';
import { ArticleCardSkeleton } from '../../ui/article-card-skeleton';
import { Notification } from '../../ui/notification';

export function OnThisDay() {
  const [fetchTodaysEvents, result] = useOnThisDay();

  return (
    <OnThisDayContainer>
      {result.isQueryable && (
        <Button onClick={() => fetchTodaysEvents()}>
          What did happen on this day?
        </Button>
      )}

      {result.isSkeleton && <ArticleCardSkeleton />}

      {result.isError && (
        <Notification type="error">
          {ON_THIS_DAY_ZOD_ERROR_MAP[`${isZodError(result.error)}`]}
        </Notification>
      )}

      {result.isEmpty && (
        <Notification type="info">
          No events found for today's date
        </Notification>
      )}

      {result.isRenderable && (
        <section className={`${result.isFetching ? 'pulse' : ''}`}>
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
