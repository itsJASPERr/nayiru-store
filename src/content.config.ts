import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { categoryIds } from "./lib/categories";

const products = defineCollection({
  loader: glob({ pattern: "*.json", base: "./content/products" }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().trim().min(1),
    state: z.enum(["draft", "editorial", "published"]).default("draft"),
    category: z.enum(categoryIds),
    description: z.string().trim().min(1),
    story: z.string().trim().min(1),
    image: z.string().regex(/^\/products\/[a-z0-9][a-z0-9._-]*\.(?:avif|jpe?g|png|webp)$/i),
    image_alt: z.string().trim().min(1),
    tags: z.array(z.string()).default([]),
    materials: z.array(z.string()).default([]),
    origin: z.string().trim().optional(),
    position: z.number().int().nonnegative().default(1000),
  }),
});

export const collections = { products };
