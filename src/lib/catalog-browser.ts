import { collections } from "./categories";

function normalize(text: string) {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("es");
}

export function initCatalog() {
  const catalog = document.querySelector("[data-catalog]");
  const form = catalog?.querySelector("form");
  const search = form?.querySelector<HTMLInputElement>("[name=q]");
  const sort = form?.querySelector<HTMLSelectElement>("[name=sort]");
  const grid = catalog?.querySelector<HTMLElement>("[data-product-grid]");
  const count = catalog?.querySelector("[data-result-count]");
  const empty = catalog?.querySelector<HTMLElement>("[data-empty-state]");
  const clear = catalog?.querySelector<HTMLAnchorElement>("[data-clear-filters]");
  const title = document.querySelector("[data-catalog-title]");
  if (!catalog || !form || !search || !sort || !grid || !count || !empty || !clear || !title) return;

  const filters = [...catalog.querySelectorAll<HTMLAnchorElement>("[data-filter]")];
  const cards = [...grid.querySelectorAll<HTMLLIElement>("li[data-title]")].map((node) => ({
    node,
    title: node.dataset.title ?? "",
    search: normalize(node.dataset.search ?? ""),
    category: node.dataset.category,
    collection: node.dataset.collection,
  }));
  const sortValues = new Set([...sort.options].map(({ value }) => value));

  const render = () => {
    const query = new URLSearchParams(location.search);
    const text = (query.get("q") ?? "").trim().slice(0, 120);
    const category = query.get("collection") ?? "";
    const requestedSort = query.get("sort") ?? "best";
    const order = sortValues.has(requestedSort) ? requestedSort : "best";
    const words = normalize(text).split(/\s+/).filter(Boolean);

    search.value = text;
    sort.value = order;
    title.textContent = collections.find(({ id }) => id === category)?.label ?? "Colección NAYIRU";

    for (const filter of filters) {
      const selected = filter.dataset.filter ?? "";
      if (selected === category) filter.setAttribute("aria-current", "true");
      else filter.removeAttribute("aria-current");

      const link = new URL(form.action);
      if (text) link.searchParams.set("q", text);
      if (order !== "best") link.searchParams.set("sort", order);
      if (selected) link.searchParams.set("collection", selected);
      filter.href = link.href;
    }

    const ordered = order === "best"
      ? cards
      : [...cards].sort((first, second) => {
          const direction = order === "title-desc" ? -1 : 1;
          return direction * first.title.localeCompare(second.title, "es");
        });

    let visible = 0;
    for (const card of ordered) {
      const categoryMatches = !category || category === card.category || category === card.collection;
      const isMatch = categoryMatches && words.every((word) => card.search.includes(word));
      card.node.hidden = !isMatch;
      if (isMatch) visible += 1;
    }

    grid.append(...ordered.map(({ node }) => node));
    grid.hidden = visible === 0;
    empty.hidden = visible !== 0;
    clear.hidden = !(text || category || order !== "best");
    const resultLabel = visible === 1 ? "1 pieza" : visible + " piezas";
    count.textContent = text ? resultLabel + " para «" + text + "»" : resultLabel;
  };

  const navigate = (url: URL) => {
    if (url.href !== location.href) window.history.pushState(null, "", url);
    render();
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const link = new URL(form.action);
    const category = new URLSearchParams(location.search).get("collection");
    const text = search.value.trim().slice(0, 120);
    if (text) link.searchParams.set("q", text);
    if (category) link.searchParams.set("collection", category);
    if (sort.value !== "best") link.searchParams.set("sort", sort.value);
    navigate(link);
  });

  for (const link of [...filters, clear]) {
    link.addEventListener("click", (event) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      navigate(new URL(link.href));
    });
  }

  window.addEventListener("popstate", render);
  render();
}
