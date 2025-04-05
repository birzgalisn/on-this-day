import { Provider } from 'react-redux';
import { setupOnThisDayStore } from './store/on-this-day-store';
import { OnThisDay } from './on-this-day';

export function OnThisDayFeature() {
  return (
    <Provider store={setupOnThisDayStore()}>
      <OnThisDay />
    </Provider>
  );
}
