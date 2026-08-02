/**
 * Application constants for UI navigation, product categories, and pagination.
 */

// Categories shown in the navbar, product grid filters, and footer.
// Kicks is intentionally excluded here — it has its own dedicated page.
export const CATEGORIES_LIST = [
    "All",
    "Beddings",
    "Home appliances",
    "Kitchenware",
    "Organizers",
    "Electronics",
    "Decor",
    "Office Equipments",
    "Furniture",
    "Gifts",
];

// Full category list used in the admin product form.
// Includes Kicks so admins can assign products to the Kicks page.
export const ADMIN_CATEGORIES_LIST = [
    "Beddings",
    "Home appliances",
    "Kitchenware",
    "Organizers",
    "Electronics",
    "Decor",
    "Office Equipments",
    "Furniture",
    "Gifts",
    "Kicks",
];

export const PRODUCTS_PER_PAGE = 8;
