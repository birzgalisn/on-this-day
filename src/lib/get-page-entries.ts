export function getPageEntries<T>({
  entries,
  page,
  size,
}: {
  entries: T[];
  page: number;
  size: number;
}) {
  const startIndex = (page - 1) * size;
  const endIndex = page + size;

  return entries.slice(startIndex, endIndex);
}
