import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { APIRoute } from "astro";
import { getCatalog } from "../../lib/catalog";

const contentTypes: Record<string, string> = {
  avif: "image/avif",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export async function getStaticPaths() {
  const { items } = await getCatalog();
  const filenames = new Set(items.flatMap(({ image }) => image ? [image.slice("/products/".length)] : []));
  return Array.from(filenames, (filename) => ({ params: { filename } }));
}

export const GET: APIRoute = async ({ params }) => {
  const filename = params.filename!;
  const bytes = await readFile(resolve("media/products", filename));
  const type = contentTypes[filename.split(".").at(-1)!.toLowerCase()];
  return new Response(new Uint8Array(bytes), { headers: { "Content-Type": type } });
};
