import {
  wikiOnThisDaySchema,
  WikiOnThisDayType,
} from '../schema/wiki-on-this-day';

export function isWikiOnThisDayType(
  value: unknown,
): value is WikiOnThisDayType {
  if (typeof value !== 'string' || !(value in wikiOnThisDaySchema.shape)) {
    return false;
  }

  return true;
}
