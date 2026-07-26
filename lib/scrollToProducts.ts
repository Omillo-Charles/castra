export function scrollToProducts(slug?: string) {
    const el = document.getElementById("products");
    if (!el) return;

    const navbarHeight = document.querySelector("header")?.offsetHeight ?? 80;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;

    window.scrollTo({ top, behavior: "smooth" });

    // replaceState instead of pushState so Next.js doesn't treat this
    // as a new navigation and re-render the page mid-scroll.
    const url = slug ? `/?category=${slug}` : "/";
    window.history.replaceState({ category: slug ?? null }, "", url);
}
