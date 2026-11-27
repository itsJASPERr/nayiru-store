import { type ShopQuery } from "@/features/shop/search-params";
import { formatMoney } from "@/lib/commerce/utils/format";
import editorial from "./editorial.json";
import published from "./products.json";

export const categories = [
  { id: "pulseras", label: "Pulseras", collection: "joyeria" },
  { id: "collares", label: "Collares", collection: "joyeria" },
  { id: "aretes", label: "Aretes", collection: "joyeria" },
  { id: "anillos", label: "Anillos", collection: "joyeria" },
  { id: "instrumentos", label: "Instrumentos", collection: "instrumentos" },
  { id: "accesorios", label: "Accesorios", collection: "accesorios" },
  { id: "decoracion", label: "Decoración", collection: "decoracion" },
];

export const collections = [
  { id: "joyeria", label: "Joyería", image: "/nayiru/pulsera-jaguar.webp" },
  {
    id: "instrumentos",
    label: "Instrumentos",
    image: "/nayiru/tambor-ceremonial.webp",
  },
  {
    id: "accesorios",
    label: "Accesorios",
    image: "/nayiru/bolso-putumayo.webp",
  },
  {
    id: "decoracion",
    label: "Decoración",
    image: "/nayiru/porta-sahumerio.webp",
  },
];

type CatalogEntry = {
  handle: string;
  title: string;
  category: string;
  description: string;
  story: string;
  tags?: string[];
  image: { src: string; alt: string };
  materials?: string[];
  origin?: string;
  price?: { amount: string; currencyCode: string };
  available?: boolean;
};

export type CatalogItem = CatalogEntry & { editorial: boolean };

const products: CatalogEntry[] = published;
const examples: CatalogEntry[] = editorial;
export const isEditorialCatalog = products.length === 0;
const catalog: CatalogItem[] = (isEditorialCatalog ? examples : products).map(
  (entry) => ({ ...entry, editorial: isEditorialCatalog }),
);

export function categoryLabel(category: string) {
  return categories.find(({ id }) => id === category)?.label ?? category;
}

function searchable(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("es");
}

export function getCatalog({ q, collection, sort }: ShopQuery) {
  const words = searchable(q).split(/\s+/).filter(Boolean);
  const results = catalog.filter((item) => {
    const category = categories.find(({ id }) => id === item.category);
    if (
      collection &&
      collection !== category?.collection &&
      collection !== item.category
    ) {
      return false;
    }

    const index = searchable(
      [
        item.title,
        categoryLabel(item.category),
        item.description,
        item.story,
        item.origin,
        ...(item.tags ?? []),
        ...(item.materials ?? []),
      ].join(" "),
    );
    return words.every((word) => index.includes(word));
  });

  if (sort === "title-asc" || sort === "title-desc") {
    const direction = sort === "title-asc" ? 1 : -1;
    results.sort((a, b) => direction * a.title.localeCompare(b.title, "es"));
  }
  return results;
}

export function findCatalogItem(handle: string) {
  return catalog.find((item) => item.handle === handle);
}

export function getCatalogHandles() {
  return catalog.map(({ handle }) => handle);
}

export function getFeaturedItems() {
  return catalog.slice(0, 4);
}

export function getRelatedItems(item: CatalogItem) {
  const matching = catalog.filter((other) => other.handle !== item.handle);
  const collection = categories.find(
    ({ id }) => id === item.category,
  )?.collection;
  const related = matching.filter(
    (other) =>
      categories.find(({ id }) => id === other.category)?.collection ===
      collection,
  );
  return (related.length ? related : matching).slice(0, 3);
}

export function itemPrice(item: CatalogItem) {
  if (!item.editorial && item.price) {
    return formatMoney(item.price, "es");
  }
}

export function whatsappLink(item?: CatalogItem) {
  const number = process.env.NAYIRU_WHATSAPP_NUMBER?.trim();
  if (
    !number ||
    !/^[1-9]\d{7,14}$/.test(number) ||
    item?.editorial ||
    item?.available === false
  ) {
    return undefined;
  }
  if (!item) return `https://wa.me/${number}`;
  const message = `Hola NAYIRU, quisiera consultar por ${item.title}.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
