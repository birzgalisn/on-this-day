import { createOnThisDayDraftSafeSelector } from '~/features/on-this-day/lib/create-on-this-day-draft-safe-selector';
import { selectOnThisDayRootState } from '~/features/on-this-day/selectors/select-on-this-day-root-state';

export const selectOnThisDayParamsType = createOnThisDayDraftSafeSelector(
  selectOnThisDayRootState,
  (state) => state.onThisDayParams.type,
);
