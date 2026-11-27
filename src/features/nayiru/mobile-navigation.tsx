"use client";

import Link from "next/link";
import { useRef } from "react";

export function MobileNavigation({
  links,
  contact,
}: {
  links: { href: string; label: string }[];
  contact?: string;
}) {
  const menu = useRef<HTMLDetailsElement>(null);

  function close() {
    if (menu.current) menu.current.open = false;
  }

  return (
    <details
      ref={menu}
      className="nayiru-menu"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menu.current?.open) {
          close();
          menu.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary aria-label="Menú">
        <span aria-hidden="true" />
      </summary>
      <nav aria-label="Navegación móvil">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} onClick={close}>
            {label}
          </Link>
        ))}
        {contact && (
          <a href={contact} onClick={close}>
            Contacto
          </a>
        )}
      </nav>
    </details>
  );
}
