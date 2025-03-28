import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { onThisDayApi } from './services/on-this-day';
import { onThisDaySlice } from './slices/on-this-day';

export const store = configureStore({
  reducer: {
    [onThisDayApi.reducerPath]: onThisDayApi.reducer,
    [onThisDaySlice.name]: onThisDaySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(onThisDayApi.middleware),
});

setupListeners(store.dispatch);
