import { getCollection, type CollectionEntry } from "astro:content";
import { categoryInfo } from "./categories";

export type Product = CollectionEntry<"products">["data"];

export async function getCatalog() {
  const entries = (await getCollection("products")).map(({ data }) => data);
  const slugs = new Set<string>();
  for (const item of entries) {
    if (slugs.has(item.slug)) {
      throw new Error(`Duplicate product slug: ${item.slug}`);
    }
    slugs.add(item.slug);
  }

  const published = entries.filter((item) => item.state === "published");
  const editorial = published.length === 0;
  const items = editorial ? entries.filter((item) => item.state === "editorial") : published;
  items.sort((first, second) =>
    first.position - second.position || first.title.localeCompare(second.title, "es"),
  );
  return { items, editorial };
}

export function relatedProducts(item: Product, items: Product[]) {
  const collection = categoryInfo[item.category].collection;
  const others = items.filter(({ slug }) => slug !== item.slug);
  const related = others.filter(({ category }) => categoryInfo[category].collection === collection);
  return (related.length ? related : others).slice(0, 3);
}
