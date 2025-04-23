import { Provider } from 'react-redux';
import { setupOnThisDayStore } from '~/features/on-this-day/store/on-this-day-store';
import { OnThisDay } from '~/features/on-this-day/on-this-day';

export function OnThisDayFeature() {
  return (
    <Provider store={setupOnThisDayStore()}>
      <OnThisDay />
    </Provider>
  );
}
