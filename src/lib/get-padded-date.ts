export function getPaddedDate({
  date,
  yearFormat = 'numeric',
}: Partial<{
  date: Date;
  yearFormat: Intl.DateTimeFormatOptions['year'];
}> = {}): [month: string, day: string, year: string] {
  const [month, day, year] = (date || new Date())
    .toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: yearFormat,
    })
    .split(/\D+/);

  return [month, day, year] as const;
}
