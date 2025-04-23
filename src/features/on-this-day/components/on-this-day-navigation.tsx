import { useOnThisDayNavigation } from '~/features/on-this-day/hooks/use-on-this-day-navigation';
import { getLeapYearIsoDate } from '~/lib/get-leap-year-iso-date';
import { DatePicker } from '~/ui/date-picker';
import { Button } from '~/ui/button';

export function OnThisDayNavigation() {
  const [{ disabled, isoDate }, handleIsoDateChange] = useOnThisDayNavigation();

  if (!isoDate) {
    return (
      <Button onClick={() => handleIsoDateChange(getLeapYearIsoDate())}>
        What happened on this day?
      </Button>
    );
  }

  return (
    <DatePicker
      {...{ disabled, isoDate }}
      onClick={handleIsoDateChange}
      className="navigation"
    />
  );
}
