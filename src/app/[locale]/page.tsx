import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  collections,
  getFeaturedItems,
  isEditorialCatalog,
} from "@/features/nayiru/catalog";
import { ProductGrid } from "@/features/nayiru/product-grid";
import { buildShopHref } from "@/features/shop/search-params";

export default function HomePage() {
  return (
    <>
      <section className="nayiru-home-hero">
        <div className="nayiru-home-image">
          <Image
            fill
            src="/nayiru/hero.webp"
            alt=""
            sizes="(max-width: 680px) 100vw, 65vw"
            preload
          />
        </div>
        <Container width="wide" className="nayiru-home-inner">
          <p className="nayiru-kicker">Artesanía y cultura viva</p>
          <h1>NAYIRU</h1>
          <p className="nayiru-hero-description">
            Piezas que cuentan historias
          </p>
          <Link className="nayiru-button nayiru-button-gold" href="/es/shop">
            Explorar la tienda
          </Link>
        </Container>
      </section>

      <section id="colecciones" className="nayiru-section">
        <Container width="wide">
          <header className="nayiru-section-heading">
            <h2>Colecciones</h2>
          </header>
          <ul className="nayiru-collections">
            {collections.map(({ id, label, image }) => (
              <li key={id}>
                <Link href={buildShopHref("es", { collection: id })}>
                  <Image src={image} width={60} height={60} alt="" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="nayiru-section nayiru-featured">
        <Container width="wide">
          <header className="nayiru-section-heading">
            <h2>
              {isEditorialCatalog
                ? "Piezas de la colección"
                : "Piezas destacadas"}
            </h2>
            <Link className="nayiru-text-link" href="/es/shop">
              Ver todo el catálogo
            </Link>
          </header>
          {isEditorialCatalog && (
            <p className="nayiru-preview-note">
              Selección del diseño original. Las piezas se muestran como
              referencia editorial.
            </p>
          )}
          <ProductGrid items={getFeaturedItems()} />
        </Container>
      </section>

      <section id="sobre-nayiru" className="nayiru-section nayiru-about">
        <Container width="wide" className="nayiru-about-inner">
          <div>
            <h2>Sobre NAYIRU</h2>
            <p>
              Una cuenta, un hilo, una veta. En cada pieza quedan huellas de la
              mano que la hizo. NAYIRU reúne artesanía y relatos para mirar de
              cerca esos detalles y acercarnos a los saberes que pasan de mano
              en mano.
            </p>
            <Link className="nayiru-text-link" href="/es/shop">
              Descubrir las piezas
            </Link>
          </div>
          <Image
            src="/nayiru/logo-claro.webp"
            width={238}
            height={276}
            alt="NAYIRU, sol y montañas"
          />
        </Container>
      </section>
    </>
  );
}
