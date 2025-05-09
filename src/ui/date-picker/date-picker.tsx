import * as stylex from '@stylexjs/stylex';
import { formatDate, subDays, addDays } from 'date-fns';
import { getLeapYearIsoDate } from '~/lib/get-leap-year-iso-date';
import { ChevronLeft } from '~/icons/chevron-left';
import { ChevronRight } from '~/icons/chevron-right';
import { Button } from '~/ui/button/button';

export type DatePickerProps = {
  isoDate: string;
  onClick: (isoDate: string) => void;
  className?: string;
  styles?: Partial<{
    navigation: stylex.StyleXStyles;
    text: stylex.StyleXStyles;
  }>;
} & Omit<React.HTMLProps<HTMLDivElement>, 'onClick'>;

export function DatePicker({
  disabled,
  isoDate,
  onClick,
  styles,
  ...props
}: DatePickerProps) {
  const handleDateChange =
    (type: 'prev' | 'next', amount = 1) =>
    () => {
      const date = { prev: subDays, next: addDays }[type](isoDate, amount);

      onClick(getLeapYearIsoDate(date));
    };

  return (
    <div {...props} {...stylex.props(styles?.navigation)}>
      <Button disabled={disabled} onClick={handleDateChange('prev')}>
        <ChevronLeft />
      </Button>

      <p {...stylex.props(styles?.text)}>{formatDate(isoDate, 'MMMM do')}</p>

      <Button disabled={disabled} onClick={handleDateChange('next')}>
        <ChevronRight />
      </Button>
    </div>
  );
}
