import { defineCollection, z } from "astro:content";

const journal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    category: z.enum(["journal", "seattle", "travel"]),
    image: z.string(),
    imageAlt: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { journal };
