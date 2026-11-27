const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const whatsappNumber = "543536569598";
const ars = new Intl.NumberFormat("es-AR");

export function formatPrice(amount: number) {
  return `${ars.format(amount)} ARS`;
}

export function sitePath(path = "/") {
  return `${base}${path}`;
}

export function siteUrl(path = "/") {
  return new URL(sitePath(path), import.meta.env.SITE).href;
}

export function productPath(slug: string) {
  return `/es/shop/${slug}/`;
}

export function whatsappHref(title?: string) {
  const message = title
    ? `Hola NAYIRU, quisiera saber más sobre «${title}».`
    : "Hola NAYIRU, quisiera saber más sobre la colección.";
  return `https://wa.me/${whatsappNumber}?${new URLSearchParams({ text: message })}`;
}
