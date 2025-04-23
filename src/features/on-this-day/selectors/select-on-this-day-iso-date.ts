import { createOnThisDayDraftSafeSelector } from '~/features/on-this-day/lib/create-on-this-day-draft-safe-selector';
import { selectOnThisDayState } from '~/features/on-this-day/selectors/select-on-this-day-state';

export const selectOnThisDayIsoDate = createOnThisDayDraftSafeSelector(
  selectOnThisDayState,
  (state) => state.onThisDay.isoDate,
);
