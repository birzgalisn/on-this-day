import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { onThisDayApi } from '~/features/on-this-day/services/on-this-day-service';
import { onThisDayReducer } from '~/features/on-this-day/slices/on-this-day-slice';

const rootReducer = combineReducers({
  [onThisDayApi.reducerPath]: onThisDayApi.reducer,
  onThisDay: onThisDayReducer,
});

export function setupOnThisDayStore(
  preloadedState?: Partial<RootOnThisDayState>,
) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(onThisDayApi.middleware),
    devTools: import.meta.env.DEV,
  });

  setupListeners(store.dispatch);

  return store;
}

export type RootOnThisDayState = ReturnType<typeof rootReducer>;

export type OnThisDayStore = ReturnType<typeof setupOnThisDayStore>;

export type OnThisDayDispatch = OnThisDayStore['dispatch'];
