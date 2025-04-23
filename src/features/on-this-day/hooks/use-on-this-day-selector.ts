import { useSelector } from 'react-redux';
import { RootOnThisDayState } from '~/features/on-this-day/store/on-this-day-store';

export const useOnThisDaySelector = useSelector.withTypes<RootOnThisDayState>();
