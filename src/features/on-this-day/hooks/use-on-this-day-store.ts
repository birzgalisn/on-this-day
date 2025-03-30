import { useStore } from 'react-redux';
import { OnThisDayStore } from '../store/on-this-day-store';

export const useOnThisDayStore = useStore.withTypes<OnThisDayStore>();
