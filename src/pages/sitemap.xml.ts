import type { APIRoute } from "astro";
import { getCatalog } from "../lib/catalog";
import { productPath, siteUrl } from "../lib/site";

export const GET: APIRoute = async () => {
  const { items } = await getCatalog();
  const routes = ["/", "/es/shop/", ...items.map(({ slug }) => productPath(slug))];
  const entries = routes.map((route) => `  <url><loc>${siteUrl(route)}</loc></url>`);
  const sitemap = ['<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries, "</urlset>", "",
  ].join("\n");
  return new Response(sitemap, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
