import { useOnThisDayDispatch } from '~/features/on-this-day/hooks/use-on-this-day-dispatch';
import { useOnThisDaySelector } from '~/features/on-this-day/hooks/use-on-this-day-selector';
import { useOnThisDayQuery } from '~/features/on-this-day/hooks/use-on-this-day-query';
import { selectOnThisDayIsoDate } from '~/features/on-this-day/selectors/select-on-this-day-iso-date';
import { setIsoDate } from '~/features/on-this-day/slices/on-this-day-slice';
import { DatePickerProps } from '~/ui/date-picker';

export function useOnThisDayNavigation() {
  const dispatch = useOnThisDayDispatch();

  const isoDate = useOnThisDaySelector(selectOnThisDayIsoDate);
  const disabled = useOnThisDayQuery({ skipEntries: true }).isFetching;

  const handleIsoDateChange: DatePickerProps['onClick'] = (isoDate) => {
    dispatch(setIsoDate({ isoDate }));
  };

  return [{ isoDate, disabled }, handleIsoDateChange] as const;
}
