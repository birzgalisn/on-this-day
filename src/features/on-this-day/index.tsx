import { Provider } from 'react-redux';
import { setupOnThisDayStore } from './store/on-this-day-store.ts';
import { OnThisDay } from './on-this-day';

export default function OnThisDayFeature() {
  return (
    <Provider store={setupOnThisDayStore()}>
      <OnThisDay />
    </Provider>
  );
}
