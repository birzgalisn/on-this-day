import { z } from 'zod';
import { wikiEventSchema } from '~/schema/wiki-event';

export const wikiOnThisDaySchema = z
  .object({
    selected: z.array(wikiEventSchema),
    births: z.array(wikiEventSchema),
    deaths: z.array(wikiEventSchema),
    events: z.array(wikiEventSchema),
    holidays: z.array(wikiEventSchema),
  })
  .partial();

export type WikiOnThisDay = z.infer<typeof wikiOnThisDaySchema>;

export type WikiOnThisDayType = keyof WikiOnThisDay;
