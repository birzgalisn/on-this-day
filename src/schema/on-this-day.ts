import { z } from 'zod';
import { typeSchema } from './type-schema';
import { orderByYear } from '../lib/order-by-year';

export const onThisDaySchema = z
  .object({
    selected: z.array(typeSchema).transform((items) => orderByYear(items)),
    births: z.array(typeSchema).transform((items) => orderByYear(items)),
    deaths: z.array(typeSchema).transform((items) => orderByYear(items)),
    events: z.array(typeSchema).transform((items) => orderByYear(items)),
    holidays: z.array(typeSchema).transform((items) => orderByYear(items)),
  })
  .partial();

export type OnThisDay = z.infer<typeof onThisDaySchema>;
export type OnThisDayType = keyof OnThisDay;
