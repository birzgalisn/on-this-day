import { format } from 'date-fns';
import { OnThisDayRootState } from '~/features/on-this-day/store/on-this-day-store';
import { getLeapYearIsoDate } from '~/lib/get-leap-year-iso-date';

export function getOnThisDayPreloadedState() {
  const isoDate = getLeapYearIsoDate();

  return {
    onThisDayParams: {
      type: 'births',
      MM: format(isoDate, 'MM'),
      DD: format(isoDate, 'dd'),
    },
  } as const satisfies Partial<OnThisDayRootState>;
}
