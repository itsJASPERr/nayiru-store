import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container width="wide" className="nayiru-section">
      <div className="nayiru-empty">
        <h1>No encontramos esta página</h1>
        <p>Explora las piezas de la colección NAYIRU.</p>
        <Link className="nayiru-text-link" href="/es/shop">
          Volver a la tienda
        </Link>
      </div>
    </Container>
  );
}
