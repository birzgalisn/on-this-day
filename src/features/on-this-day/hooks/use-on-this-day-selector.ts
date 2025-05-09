import { useSelector } from 'react-redux';
import { OnThisDayRootState } from '~/features/on-this-day/store/on-this-day-store';

export const useOnThisDaySelector = useSelector.withTypes<OnThisDayRootState>();
