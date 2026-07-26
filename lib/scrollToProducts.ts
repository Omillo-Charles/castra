/**
 * Smoothly scrolls to the #products section, accounting for the sticky
 * navbar height, and updates the URL with the selected category slug
 * without triggering a Next.js navigation / re-render.
 *
 * Also dispatches a "categorychange" custom event so ProductGrid can
 * react immediately — replaceState alone never fires popstate.
 */
export function scrollToProducts(slug?: string) {
    const el = document.getElementById("products");
    if (!el) return;

    const navbarHeight = document.querySelector("header")?.offsetHeight ?? 80;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;

    window.scrollTo({ top, behavior: "smooth" });

    const url = slug ? `/?category=${slug}` : "/";
    window.history.replaceState({ category: slug ?? null }, "", url);

    // Notify ProductGrid — replaceState never fires popstate
    window.dispatchEvent(new CustomEvent("categorychange", { detail: { slug } }));
}
