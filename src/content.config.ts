import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { categoryIds } from "./lib/categories";

const blankToUndefined = (value: unknown) => value === null || value === "" ? undefined : value;

const products = defineCollection({
  loader: glob({ pattern: "*.json", base: "./content/products" }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().trim().min(1),
    state: z.enum(["draft", "editorial", "published"]).default("draft"),
    category: z.enum(categoryIds),
    description: z.string().trim().min(1),
    story: z.preprocess(blankToUndefined, z.string().trim().min(1).optional()),
    price_ars: z.preprocess(blankToUndefined, z.number().int().nonnegative().optional()),
    sold_out: z.boolean().default(false),
    image: z.preprocess(blankToUndefined, z.string().regex(/^\/products\/[a-z0-9][a-z0-9._-]*\.(?:avif|jpe?g|png|webp)$/i).optional()),
    image_alt: z.preprocess(blankToUndefined, z.string().trim().min(1).optional()),
    tags: z.array(z.string()).default([]),
    materials: z.array(z.string()).default([]),
    origin: z.string().trim().optional(),
    position: z.number().int().nonnegative().default(1000),
  }).refine(({ image, image_alt }) => !image || !!image_alt, {
    path: ["image_alt"],
    message: "Añade un texto alternativo para la foto.",
  }),
});

export const collections = { products };
