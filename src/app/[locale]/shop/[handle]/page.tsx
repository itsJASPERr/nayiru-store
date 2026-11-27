import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import {
  categoryLabel,
  findCatalogItem,
  getCatalogHandles,
  getRelatedItems,
  itemPrice,
  whatsappLink,
} from "@/features/nayiru/catalog";
import { ProductGrid } from "@/features/nayiru/product-grid";

type Props = {
  params: Promise<{ handle: string }>;
};

export function generateStaticParams() {
  return getCatalogHandles().map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = findCatalogItem((await params).handle);
  if (!item) return { title: "Pieza no encontrada" };
  return { title: item.title, description: item.description };
}

export default async function ProductRoutePage({ params }: Props) {
  const item = findCatalogItem((await params).handle);
  if (!item) notFound();

  const related = getRelatedItems(item);
  const price = itemPrice(item);
  const whatsapp = whatsappLink(item);

  return (
    <Container width="wide" className="nayiru-product">
      <Link className="nayiru-text-link nayiru-back" href="/es/shop">
        Volver a la tienda
      </Link>
      <article className="nayiru-product-layout">
        <div className="nayiru-product-photo">
          <Image
            fill
            src={item.image.src}
            alt={item.image.alt}
            sizes="(max-width: 760px) 95vw, 48vw"
            preload
          />
        </div>
        <div className="nayiru-product-copy">
          <p className="nayiru-kicker">{categoryLabel(item.category)}</p>
          <h1>{item.title}</h1>
          <p className="nayiru-product-intro">{item.description}</p>
          {price && <p className="nayiru-price">{price}</p>}
          {item.editorial && (
            <p className="nayiru-preview-note">
              Pieza de referencia del diseño original.
            </p>
          )}
          {!item.editorial && item.available === false && (
            <p className="nayiru-preview-note">Pieza no disponible.</p>
          )}
          {whatsapp && (
            <a className="nayiru-button nayiru-button-search" href={whatsapp}>
              Consultar por WhatsApp
            </a>
          )}
          <section className="nayiru-product-story">
            <h2>
              {item.editorial ? "La pieza de cerca" : "Historia de la pieza"}
            </h2>
            <p>{item.story}</p>
            {(item.origin || item.materials?.length) && (
              <dl>
                {item.origin && (
                  <div>
                    <dt>Origen</dt>
                    <dd>{item.origin}</dd>
                  </div>
                )}
                {!!item.materials?.length && (
                  <div>
                    <dt>Materiales</dt>
                    <dd>{item.materials.join(", ")}</dd>
                  </div>
                )}
              </dl>
            )}
          </section>
        </div>
      </article>
      {related.length > 0 && (
        <section className="nayiru-related">
          <header className="nayiru-section-heading">
            <h2>También en la colección</h2>
          </header>
          <ProductGrid items={related} />
        </section>
      )}
    </Container>
  );
}
