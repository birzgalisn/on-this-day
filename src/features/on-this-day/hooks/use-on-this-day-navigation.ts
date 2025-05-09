import { useOnThisDayDispatch } from '~/features/on-this-day/hooks/use-on-this-day-dispatch';
import { useOnThisDaySelector } from '~/features/on-this-day/hooks/use-on-this-day-selector';
import { useOnThisDayQuery } from '~/features/on-this-day/hooks/use-on-this-day-query';
import { selectOnThisDayParamsIsoDate } from '~/features/on-this-day/selectors/select-on-this-day-params-date';
import { setDate } from '~/features/on-this-day/slices/on-this-day-params-slice';
import { DatePickerProps } from '~/ui/date-picker/date-picker';

export function useOnThisDayNavigation() {
  const dispatch = useOnThisDayDispatch();

  const isoDate = useOnThisDaySelector(selectOnThisDayParamsIsoDate);
  const disabled = useOnThisDayQuery().isFetching;

  const handleIsoDateChange: DatePickerProps['onClick'] = (date) => {
    dispatch(setDate({ date }));
  };

  return [{ isoDate, disabled }, handleIsoDateChange] as const;
}
