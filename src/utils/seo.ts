/**
 * Lightweight SEO helper — updates <title> and meta tags per route.
 * No dependency needed (SPA: Google renders JS, so client-side head
 * updates plus static tags in index.html are enough for a portfolio).
 *
 * Canonical/OG URLs are derived from window.location.origin so they stay
 * correct no matter which domain the site is deployed to.
 *
 * Live domain: https://iampolio.pages.dev/ (Cloudflare Pages).
 * If the domain changes (e.g., custom domain), update SITE_URL below AND the
 * static files: index.html (canonical/og:url/og:image/JSON-LD),
 * public/sitemap.xml and public/robots.txt.
 */
export const SITE_URL = "https://iampolio.pages.dev";

export const DEFAULT_TITLE =
  "Mochammad Ilham Maulana — Creative Developer & Frontend Engineer";
export const DEFAULT_DESCRIPTION =
  "Portfolio of Mochammad Ilham Maulana — a creative developer building high-performance web experiences, micro-frontends, and scalable interfaces for enterprises and startups worldwide.";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Apply per-route head meta. Pass the route meta; falls back to site defaults. */
export function setPageMeta(meta?: { title?: string; description?: string }) {
  if (typeof document === "undefined") return;

  const title = meta?.title
    ? `${meta.title} — Mochammad Ilham Maulana`
    : DEFAULT_TITLE;
  const description = meta?.description || DEFAULT_DESCRIPTION;
  const origin = typeof window !== "undefined" ? window.location.origin : SITE_URL;
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const url = `${origin}${path}`;
  const image = `${origin}/og-image.png`;

  document.title = title;
  upsertMeta("name", "description", description);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:type", "website");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", image);
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertLink("canonical", url);
}
