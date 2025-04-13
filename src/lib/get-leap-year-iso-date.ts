import { format } from 'date-fns';

export function getLeapYearIsoDate(date?: Date): string;
export function getLeapYearIsoDate(isoDate?: string): string;
export function getLeapYearIsoDate(date: Date | string = new Date()) {
  return `2024-${format(date, 'MM-dd')}T00:00:00.000Z`;
}
