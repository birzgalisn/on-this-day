import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { onThisDayApi } from './services/on-this-day';
import { onThisDaySlice } from './slices/on-this-day';

const rootReducer = combineReducers({
  [onThisDayApi.reducerPath]: onThisDayApi.reducer,
  [onThisDaySlice.name]: onThisDaySlice.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(onThisDayApi.middleware),
  });

  setupListeners(store.dispatch);

  return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
