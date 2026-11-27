import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { MobileNavigation } from "./mobile-navigation";
import { whatsappLink } from "./catalog";

const links = [
  { label: "Inicio", href: "/es" },
  { label: "Tienda", href: "/es/shop" },
  { label: "Colecciones", href: "/es#colecciones" },
  { label: "Sobre NAYIRU", href: "/es#sobre-nayiru" },
];

export function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="10.5" cy="10.5" r="6.3" />
      <path d="m15.2 15.2 5 5" />
    </svg>
  );
}

function Brand() {
  return (
    <Link className="nayiru-brand" href="/es" aria-label="NAYIRU, inicio">
      <Image
        className="nayiru-mark"
        src="/nayiru/simbolo-oscuro.webp"
        width={42}
        height={44}
        alt=""
      />
      <span>
        <span className="nayiru-wordmark">NAYIRU</span>
        <span className="nayiru-brandline">Artesanía y cultura viva</span>
      </span>
    </Link>
  );
}

function Navigation({ contact }: { contact?: string }) {
  return (
    <>
      {links.map(({ href, label }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
      {contact && <a href={contact}>Contacto</a>}
    </>
  );
}

export function StorefrontShell({ children }: { children: ReactNode }) {
  const contact = whatsappLink();

  return (
    <div className="nayiru-site">
      <a href="#contenido" className="nayiru-skip">
        Saltar al contenido
      </a>
      <header className="nayiru-header">
        <Container width="wide" className="nayiru-header-inner">
          <Brand />
          <nav className="nayiru-nav" aria-label="Navegación principal">
            <Navigation contact={contact} />
          </nav>
          <div className="nayiru-header-actions">
            <Link
              href="/es/shop#buscar"
              aria-label="Buscar en la tienda"
              className="nayiru-search-link"
            >
              <SearchIcon />
            </Link>
            <MobileNavigation links={links} contact={contact} />
          </div>
        </Container>
      </header>
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <footer className="nayiru-footer">
        <Container width="wide" className="nayiru-footer-inner">
          <Image
            className="nayiru-mark"
            src="/nayiru/logo-oscuro.webp"
            width={62}
            height={72}
            alt="NAYIRU"
          />
          <nav aria-label="Pie de página">
            <Link href="/es/shop">Tienda</Link>
            <Link href="/es#colecciones">Colecciones</Link>
            <Link href="/es#sobre-nayiru">Sobre NAYIRU</Link>
            {contact && <a href={contact}>Contacto</a>}
          </nav>
          <small>© {new Date().getFullYear()} NAYIRU</small>
        </Container>
      </footer>
    </div>
  );
}
