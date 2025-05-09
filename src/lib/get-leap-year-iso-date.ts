import { format } from 'date-fns';

export function getLeapYearIsoDate(date: string | Date = new Date()) {
  return `2024-${format(date, 'MM-dd')}T00:00:00.000Z`;
}
