import { useDispatch } from 'react-redux';
import { OnThisDayDispatch } from '~/features/on-this-day/store/on-this-day-store';

export const useOnThisDayDispatch = useDispatch.withTypes<OnThisDayDispatch>();
