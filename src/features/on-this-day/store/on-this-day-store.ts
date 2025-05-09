import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { onThisDayApi } from '~/features/on-this-day/services/on-this-day-service';
import { onThisDayParamsReducer } from '~/features/on-this-day/slices/on-this-day-params-slice';
import { onThisDayPaginationReducer } from '~/features/on-this-day/slices/on-this-day-pagination-slice';

const rootReducer = combineReducers({
  [onThisDayApi.reducerPath]: onThisDayApi.reducer,
  onThisDayParams: onThisDayParamsReducer,
  onThisDayPagination: onThisDayPaginationReducer,
});

export function setupOnThisDayStore(
  preloadedState?: Partial<OnThisDayRootState>,
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

export type OnThisDayRootState = ReturnType<typeof rootReducer>;

export type OnThisDayStore = ReturnType<typeof setupOnThisDayStore>;

export type OnThisDayDispatch = OnThisDayStore['dispatch'];
