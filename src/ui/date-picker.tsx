import { memo } from 'react';
import { formatDate, subDays, addDays } from 'date-fns';
import { getLeapYearIsoDate } from '../lib/get-leap-year-iso-date';
import { ChevronLeft } from '../icons/chevron-left';
import { ChevronRight } from '../icons/chevron-right';
import { Button } from './button';

export type DatePickerProps = {
  isoDate: string;
  onClick: (isoDate: string) => void;
  className?: string;
} & Omit<React.HTMLProps<HTMLDivElement>, 'onClick'>;

function DatePicker({
  disabled,
  isoDate,
  onClick,
  className = '',
  ...props
}: DatePickerProps) {
  const handleDateChange =
    (type: 'prev' | 'next', amount = 1) =>
    () => {
      const date = { prev: subDays, next: addDays }[type](isoDate, amount);

      onClick(getLeapYearIsoDate(date));
    };

  return (
    <div className={`container row ${className}`} {...props}>
      <Button disabled={disabled} onClick={handleDateChange('prev')}>
        <ChevronLeft />
      </Button>

      <p>{formatDate(isoDate, 'MMMM do')}</p>

      <Button disabled={disabled} onClick={handleDateChange('next')}>
        <ChevronRight />
      </Button>
    </div>
  );
}

const DatePickerMemo = memo(DatePicker);

export { DatePickerMemo as DatePicker };
