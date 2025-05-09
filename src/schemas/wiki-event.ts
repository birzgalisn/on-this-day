import { z } from 'zod';
import { wikiPageSchema } from '~/schemas/wiki-page';

export const wikiEventSchema = z.object({
  text: z.string(),
  pages: z.array(wikiPageSchema),
  year: z.number().optional(),
});

export type WikiEvent = z.infer<typeof wikiEventSchema>;
