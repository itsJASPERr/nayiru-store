import Image from "next/image";
import Link from "next/link";
import { categoryLabel, itemPrice, type CatalogItem } from "./catalog";

export function ProductGrid({ items }: { items: CatalogItem[] }) {
  return (
    <ul className="nayiru-grid">
      {items.map((item) => {
        const price = itemPrice(item);
        return (
          <li key={item.handle}>
            <Link className="nayiru-card" href={`/es/shop/${item.handle}`}>
              <div className="nayiru-card-photo">
                <Image
                  fill
                  src={item.image.src}
                  alt=""
                  sizes="(max-width: 520px) 46vw, (max-width: 760px) 30vw, 235px"
                />
              </div>
              <div className="nayiru-card-copy">
                <p className="nayiru-kicker">{categoryLabel(item.category)}</p>
                <h3>{item.title}</h3>
                {price && <p>{price}</p>}
                {!item.editorial && item.available === false && (
                  <p>No disponible</p>
                )}
                <span className="nayiru-card-link">Ver detalles</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
