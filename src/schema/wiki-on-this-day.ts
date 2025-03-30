import { z } from 'zod';
import { wikiEventSchema } from './wiki-event';

export const wikiOnThisDaySchema = z
  .object({
    births: z.array(wikiEventSchema),
  })
  .partial();

export type WikiOnThisDay = z.infer<typeof wikiOnThisDaySchema>;
export type WikiOnThisDayType = keyof WikiOnThisDay;
