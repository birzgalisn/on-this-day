import * as stylex from '@stylexjs/stylex';
import { spacing } from '~/global-tokens.stylex';
import { useOnThisDayNavigation } from '~/features/on-this-day/hooks/use-on-this-day-navigation';
import { getLeapYearIsoDate } from '~/lib/get-leap-year-iso-date';
import { DatePicker } from '~/ui/date-picker/date-picker';
import { Button } from '~/ui/button/button';

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
      styles={{ navigation: styles.navigation, text: styles.text }}
    />
  );
}

const styles = stylex.create({
  navigation: {
    alignItems: 'center',
    display: 'flex',
  },
  text: {
    padding: spacing.md,
  },
});
