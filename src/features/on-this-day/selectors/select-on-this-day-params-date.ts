import { createOnThisDayDraftSafeSelector } from '~/features/on-this-day/lib/create-on-this-day-draft-safe-selector';
import { selectOnThisDayRootState } from '~/features/on-this-day/selectors/select-on-this-day-root-state';
import { getLeapYearIsoDate } from '~/lib/get-leap-year-iso-date';

export const selectOnThisDayParamsIsoDate = createOnThisDayDraftSafeSelector(
  selectOnThisDayRootState,
  (state) => {
    const { MM, DD } = state.onThisDayParams;

    if (!MM || !DD) {
      return;
    }

    return getLeapYearIsoDate(`${MM}-${DD}`);
  },
);
