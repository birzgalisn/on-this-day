import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { OnThisDayRootState } from '~/features/on-this-day/store/on-this-day-store';

export const createOnThisDayDraftSafeSelector =
  createDraftSafeSelector.withTypes<OnThisDayRootState>();
