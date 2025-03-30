import { WikiOnThisDayType } from '../schema/wiki-on-this-day';

export const WIKI_ON_THIS_DAY_TYPE_MAP = Object.freeze({
  births: 'Notable people born on the given date',
} satisfies Record<WikiOnThisDayType, string>);
