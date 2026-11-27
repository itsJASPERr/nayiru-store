const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const whatsappNumber = "543536569598";

export function sitePath(path = "/") {
  return `${base}${path}`;
}

export function whatsappHref(title?: string) {
  const message = title
    ? `Hola NAYIRU, quisiera saber más sobre «${title}».`
    : "Hola NAYIRU, quisiera saber más sobre la colección.";
  return `https://wa.me/${whatsappNumber}?${new URLSearchParams({ text: message })}`;
}
