import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  categories,
  collections,
  getCatalog,
  isEditorialCatalog,
} from "@/features/nayiru/catalog";
import { ProductGrid } from "@/features/nayiru/product-grid";
import { SearchIcon } from "@/features/nayiru/storefront-shell";
import { buildShopHref, parseShopQuery } from "@/features/shop/search-params";

export const metadata: Metadata = {
  title: "Colección NAYIRU",
  description:
    "Explora la colección artesanal de NAYIRU por categoría o busca por nombre y detalle.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const filters = [{ id: "", label: "Todas las piezas" }, ...categories];
const sortOptions = [
  { value: "best", label: "Destacadas" },
  { value: "title-asc", label: "Nombre, A a Z" },
  { value: "title-desc", label: "Nombre, Z a A" },
];

export default async function ShopRoutePage({ searchParams }: Props) {
  const raw = await searchParams;
  const query = parseShopQuery(raw);
  query.q = query.q.slice(0, 120);
  const items = getCatalog(query);
  const sort = sortOptions.some(({ value }) => value === query.sort)
    ? query.sort
    : "best";
  const collection = collections.find(({ id }) => id === query.collection);

  return (
    <>
      <section className="nayiru-catalog-hero">
        <Container width="wide">
          <div className="nayiru-ornament" aria-hidden="true">
            <span />
          </div>
          <h1>{collection ? collection.label : "Colección NAYIRU"}</h1>
          <p>Artesanía inspirada en la naturaleza y la sabiduría ancestral.</p>
        </Container>
      </section>

      <Container width="wide" className="nayiru-catalog">
        <aside className="nayiru-catalog-sidebar">
          <h2>Categorías</h2>
          <nav
            className="nayiru-filter-nav"
            aria-label="Categorías del catálogo"
          >
            {filters.map(({ id, label }) => (
              <Link
                key={id}
                aria-current={query.collection === id ? "true" : undefined}
                href={buildShopHref("es", { q: query.q, sort, collection: id })}
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="nayiru-results" aria-labelledby="resultados">
          <h2 className="sr-only" id="resultados">
            Piezas de la colección
          </h2>
          <form
            key={JSON.stringify([query.q, query.collection, sort])}
            role="search"
            action="/es/shop"
            className="nayiru-search-form"
          >
            {query.collection && (
              <input type="hidden" name="collection" value={query.collection} />
            )}
            <label className="nayiru-search-field">
              <span>Buscar piezas</span>
              <input
                id="buscar"
                type="search"
                name="q"
                placeholder="Nombre, material o detalle"
                defaultValue={query.q}
                maxLength={120}
              />
            </label>
            <label className="nayiru-sort-field">
              <span>Ordenar por</span>
              <select name="sort" defaultValue={sort}>
                {sortOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="nayiru-button nayiru-button-search"
              type="submit"
            >
              <SearchIcon /> Buscar
            </button>
          </form>

          <div className="nayiru-result-info">
            <p>
              {items.length === 1 ? "1 pieza" : `${items.length} piezas`}
              {query.q && <> para «{query.q}»</>}
            </p>
            {(query.q || query.collection || sort !== "best") && (
              <Link className="nayiru-text-link" href="/es/shop">
                Limpiar filtros
              </Link>
            )}
          </div>
          {isEditorialCatalog && (
            <p className="nayiru-preview-note">
              Vista editorial. Las piezas y fotos del boceto se muestran como
              referencia.
            </p>
          )}
          {items.length ? (
            <ProductGrid items={items} />
          ) : (
            <div className="nayiru-empty">
              <h2>No encontramos piezas</h2>
              <p>Prueba otra palabra o elige una categoría diferente.</p>
              <Link className="nayiru-text-link" href="/es/shop">
                Ver todas las piezas
              </Link>
            </div>
          )}
        </section>
      </Container>
    </>
  );
}
