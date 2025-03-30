import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { RenderOptions } from '@testing-library/react';
import {
  setupOnThisDayStore,
  OnThisDayStore,
  RootOnThisDayState,
} from '../store/on-this-day-store';

type ExtendedRenderOptions = {
  preloadedState?: Partial<RootOnThisDayState>;
  store?: OnThisDayStore;
} & Omit<RenderOptions, 'queries'>;

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupOnThisDayStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  const Wrapper = ({ children }: React.PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  } as const;
}
