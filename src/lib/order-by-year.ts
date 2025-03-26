export function orderByYear<Item extends { year?: number }>(
  items: Item[],
  order: 'asc' | 'desc' = 'desc',
) {
  return items.sort((a, b) => {
    const yearA = a.year ?? 0;
    const yearB = b.year ?? 0;

    if (order === 'asc') {
      return yearA - yearB;
    }

    return yearB - yearA;
  });
}
