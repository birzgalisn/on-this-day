import { z } from 'zod';
import { eventSchema } from './event-schema';

export const typeSchema = z.object({
  text: z.string(),
  pages: z.array(eventSchema),
  year: z.number().optional(),
});

export type Type = z.infer<typeof typeSchema>;
