import { useSelector } from 'react-redux';
import { RootOnThisDayState } from '../store/on-this-day-store';

export const useOnThisDaySelector = useSelector.withTypes<RootOnThisDayState>();
