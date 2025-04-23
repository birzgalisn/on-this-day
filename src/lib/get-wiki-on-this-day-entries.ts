import { WikiOnThisDayType } from '~/schema/wiki-on-this-day';
import { isWikiOnThisDayType } from '~/lib/is-wiki-on-this-day-type';

export function getWikiOnThisDayEntries<T>(data: Record<string, T[]>) {
  const entries = Object.entries(data);

  const filteredEntries = entries.filter(([type]) =>
    isWikiOnThisDayType(type),
  ) as [type: WikiOnThisDayType, entries: T[]][];

  return filteredEntries;
}
