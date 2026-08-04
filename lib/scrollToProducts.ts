/**
 * Smoothly scrolls to the #products section, accounting for the sticky
 * navbar height, and dispatches a "categorychange" custom event so the
 * ProductGrid can react and update the URL correctly.
 *
 * We no longer call window.history.replaceState here — the ProductGrid's
 * updateQueryParams owns URL state. Calling replaceState directly was
 * clobbering search params set by router.replace in handleSearchSubmit.
 */
export function scrollToProducts(slug?: string) {
    const el = document.getElementById("products");
    if (el) {
        const navbarHeight = document.querySelector("header")?.offsetHeight ?? 80;
        const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;
        window.scrollTo({ top, behavior: "smooth" });
    }

    // Notify ProductGrid — it will update the URL via router.replace,
    // preserving any other existing params (like search).
    window.dispatchEvent(new CustomEvent("categorychange", { detail: { slug } }));
}
