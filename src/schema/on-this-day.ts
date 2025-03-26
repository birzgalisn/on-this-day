import { z } from 'zod';
import { typeSchema } from './type-schema';

export const onThisDaySchema = z
  .object({
    selected: z.array(typeSchema),
    births: z.array(typeSchema),
    deaths: z.array(typeSchema),
    events: z.array(typeSchema),
    holidays: z.array(typeSchema),
  })
  .partial();

export type OnThisDay = z.infer<typeof onThisDaySchema>;
