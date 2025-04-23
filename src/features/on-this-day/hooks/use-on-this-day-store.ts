import { useStore } from 'react-redux';
import { OnThisDayStore } from '~/features/on-this-day/store/on-this-day-store';

export const useOnThisDayStore = useStore.withTypes<OnThisDayStore>();
