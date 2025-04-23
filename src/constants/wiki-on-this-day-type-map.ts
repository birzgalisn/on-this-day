import { WikiOnThisDayType } from '~/schema/wiki-on-this-day';

export const WIKI_ON_THIS_DAY_TYPE_MAP = Object.freeze({
  selected: 'Curated set of events that occurred on the given date',
  births: 'Notable people born on the given date',
  deaths: 'Notable people who died on the given date',
  events:
    'Events that occurred on the given date that are not included in another type',
  holidays: 'Fixed holidays celebrated on the given date',
} satisfies Record<WikiOnThisDayType, string>);
