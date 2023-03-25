// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
// 2. Define a schema for each collection you'd like to validate.
const recipe = defineCollection({
  schema: z.object({
    publishDate: z.string().transform((str) => new Date()),
    title: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    keyIngredient: z.string().optional(),
    }),
});
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'recipe': recipe,
};
