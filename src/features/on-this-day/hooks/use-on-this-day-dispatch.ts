import { useDispatch } from 'react-redux';
import { OnThisDayDispatch } from '../store/on-this-day-store';

export const useOnThisDayDispatch = useDispatch.withTypes<OnThisDayDispatch>();
