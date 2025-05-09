import { z } from 'zod';

export const wikiPageSchema = z.object({
  type: z.enum(['standard', 'disambiguation', 'no-extract', 'mainpage']),
  title: z.string(),
  displaytitle: z.string(),
  namespace: z.object({
    id: z.number(),
    text: z.string(),
  }),
  wikibase_item: z.string().optional(),
  titles: z.object({
    canonical: z.string(),
    normalized: z.string(),
    display: z.string(),
  }),
  pageid: z.number(),
  thumbnail: z
    .object({
      source: z.string().url(),
      width: z.number(),
      height: z.number(),
    })
    .optional(),
  originalimage: z
    .object({
      source: z.string().url(),
      width: z.number(),
      height: z.number(),
    })
    .optional(),
  lang: z.string(),
  dir: z.string(),
  revision: z.string(),
  tid: z.string(),
  timestamp: z.string(),
  description: z.string().optional(),
  description_source: z.string().optional(),
  content_urls: z.object({
    desktop: z.object({
      page: z.string().url(),
      revisions: z.string().url(),
      edit: z.string().url(),
      talk: z.string().url(),
    }),
    mobile: z.object({
      page: z.string().url(),
      revisions: z.string().url(),
      edit: z.string().url(),
      talk: z.string().url(),
    }),
  }),
  extract: z.string(),
  extract_html: z.string(),
  normalizedtitle: z.string(),
});

export type WikiPage = z.infer<typeof wikiPageSchema>;
