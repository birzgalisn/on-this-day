import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootOnThisDayState } from '../store/on-this-day-store';

export const createOnThisDayDraftSafeSelector =
  createDraftSafeSelector.withTypes<RootOnThisDayState>();
