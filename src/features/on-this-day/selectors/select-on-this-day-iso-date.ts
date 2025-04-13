import { createOnThisDayDraftSafeSelector } from '../lib/create-on-this-day-draft-safe-selector';
import { selectOnThisDayState } from './select-on-this-day-state';

export const selectOnThisDayIsoDate = createOnThisDayDraftSafeSelector(
  selectOnThisDayState,
  (state) => state.onThisDay.isoDate,
);
