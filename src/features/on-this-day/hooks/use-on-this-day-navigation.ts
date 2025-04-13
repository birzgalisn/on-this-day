import { useOnThisDayDispatch } from './use-on-this-day-dispatch';
import { useOnThisDaySelector } from './use-on-this-day-selector';
import { useOnThisDayQuery } from './use-on-this-day-query';
import { selectOnThisDayIsoDate } from '../selectors/select-on-this-day-iso-date';
import { setIsoDate } from '../slices/on-this-day-slice';
import { DatePickerProps } from '../../../ui/date-picker';

export function useOnThisDayNavigation() {
  const dispatch = useOnThisDayDispatch();

  const isoDate = useOnThisDaySelector(selectOnThisDayIsoDate);
  const disabled = useOnThisDayQuery({ skipEntries: true }).isFetching;

  const handleIsoDateChange: DatePickerProps['onClick'] = (isoDate) => {
    dispatch(setIsoDate({ isoDate }));
  };

  return [{ isoDate, disabled }, handleIsoDateChange] as const;
}
