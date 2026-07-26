export type Product = {
    id: string;
    name: string;
    category: string;
    slug: string;
    price: number;
    originalPrice?: number;
    badge?: "New" | "Sale" | "Hot" | "Limited";
    rating: number;
    reviewCount: number;
    inStock: boolean;
};

export const DUMMY_PRODUCTS: Product[] = [
    // Beddings
    { id: "1",  name: "Egyptian Cotton Duvet Set",      category: "Beddings",          slug: "beddings",          price: 4800,  originalPrice: 6200,  badge: "Sale",    rating: 4.8, reviewCount: 124, inStock: true  },
    { id: "2",  name: "Bamboo Pillow Pair",             category: "Beddings",          slug: "beddings",          price: 1950,                        badge: "New",     rating: 4.6, reviewCount: 58,  inStock: true  },
    { id: "3",  name: "Weighted Blanket 8kg",           category: "Beddings",          slug: "beddings",          price: 5500,                        badge: "Hot",     rating: 4.9, reviewCount: 201, inStock: true  },
    { id: "4",  name: "Waterproof Mattress Protector",  category: "Beddings",          slug: "beddings",          price: 1200,                                          rating: 4.3, reviewCount: 44,  inStock: true  },
    // Home Appliances
    { id: "5",  name: "Air Fryer 5.5L",                category: "Home appliances",   slug: "home-appliances",   price: 8900,  originalPrice: 10500, badge: "Sale",    rating: 4.7, reviewCount: 312, inStock: true  },
    { id: "6",  name: "Cordless Hand Blender",         category: "Home appliances",   slug: "home-appliances",   price: 3200,                        badge: "New",     rating: 4.5, reviewCount: 87,  inStock: true  },
    { id: "7",  name: "Steam Iron Pro",                category: "Home appliances",   slug: "home-appliances",   price: 2750,                                          rating: 4.2, reviewCount: 65,  inStock: false },
    { id: "8",  name: "Robotic Vacuum Cleaner",        category: "Home appliances",   slug: "home-appliances",   price: 18500, originalPrice: 22000, badge: "Hot",     rating: 4.8, reviewCount: 178, inStock: true  },
    // Kitchenware
    { id: "9",  name: "Non-Stick Cookware Set 8pc",    category: "Kitchenware",       slug: "kitchenware",       price: 6400,  originalPrice: 7800,  badge: "Sale",    rating: 4.6, reviewCount: 233, inStock: true  },
    { id: "10", name: "Stainless Knife Block Set",     category: "Kitchenware",       slug: "kitchenware",       price: 3900,                        badge: "New",     rating: 4.7, reviewCount: 99,  inStock: true  },
    { id: "11", name: "Glass Food Storage 10pc",       category: "Kitchenware",       slug: "kitchenware",       price: 2200,                                          rating: 4.4, reviewCount: 56,  inStock: true  },
    { id: "12", name: "Cast Iron Dutch Oven",          category: "Kitchenware",       slug: "kitchenware",       price: 5100,                        badge: "Limited", rating: 4.9, reviewCount: 142, inStock: true  },
    // Organizers
    { id: "13", name: "Closet Organizer System",       category: "Organizers",        slug: "organizers",        price: 3600,                        badge: "Hot",     rating: 4.5, reviewCount: 88,  inStock: true  },
    { id: "14", name: "Under-Bed Storage Bags 4pk",    category: "Organizers",        slug: "organizers",        price: 950,                                           rating: 4.2, reviewCount: 37,  inStock: true  },
    { id: "15", name: "Stackable Drawer Units",        category: "Organizers",        slug: "organizers",        price: 2800,  originalPrice: 3400,  badge: "Sale",    rating: 4.4, reviewCount: 71,  inStock: true  },
    { id: "16", name: "Bamboo Desk Organizer",         category: "Organizers",        slug: "organizers",        price: 1400,                        badge: "New",     rating: 4.6, reviewCount: 49,  inStock: true  },
    // Electronics
    { id: "17", name: "LED Smart Desk Lamp",           category: "Electronics",       slug: "electronics",       price: 2900,                        badge: "New",     rating: 4.7, reviewCount: 115, inStock: true  },
    { id: "18", name: "Wireless Charging Pad 3-in-1",  category: "Electronics",       slug: "electronics",       price: 3500,  originalPrice: 4200,  badge: "Sale",    rating: 4.5, reviewCount: 93,  inStock: true  },
    { id: "19", name: "Bluetooth Speaker Portable",    category: "Electronics",       slug: "electronics",       price: 4100,                        badge: "Hot",     rating: 4.8, reviewCount: 267, inStock: true  },
    { id: "20", name: "Power Strip Surge Protector",   category: "Electronics",       slug: "electronics",       price: 1800,                                          rating: 4.3, reviewCount: 54,  inStock: false },
    // Decor
    { id: "21", name: "Macramé Wall Hanging",          category: "Decor",             slug: "decor",             price: 2100,                        badge: "New",     rating: 4.6, reviewCount: 61,  inStock: true  },
    { id: "22", name: "Ceramic Vase Set 3pc",          category: "Decor",             slug: "decor",             price: 1700,  originalPrice: 2100,  badge: "Sale",    rating: 4.5, reviewCount: 48,  inStock: true  },
    { id: "23", name: "Scented Soy Candle Collection", category: "Decor",             slug: "decor",             price: 1350,                        badge: "Hot",     rating: 4.7, reviewCount: 136, inStock: true  },
    { id: "24", name: "Geometric Mirror Set",          category: "Decor",             slug: "decor",             price: 4400,                        badge: "Limited", rating: 4.9, reviewCount: 77,  inStock: true  },
    // Office Equipments
    { id: "25", name: "Ergonomic Mesh Chair",          category: "Office Equipments", slug: "office-equipments", price: 12500, originalPrice: 15000, badge: "Sale",    rating: 4.8, reviewCount: 189, inStock: true  },
    { id: "26", name: "Height-Adjustable Laptop Stand",category: "Office Equipments", slug: "office-equipments", price: 2600,                        badge: "New",     rating: 4.6, reviewCount: 72,  inStock: true  },
    { id: "27", name: "Monitor Riser with Drawer",     category: "Office Equipments", slug: "office-equipments", price: 3100,                                          rating: 4.4, reviewCount: 43,  inStock: true  },
    { id: "28", name: "Whiteboard Magnetic 60×90cm",   category: "Office Equipments", slug: "office-equipments", price: 2300,                        badge: "Hot",     rating: 4.3, reviewCount: 35,  inStock: false },
    // Furniture
    { id: "29", name: "Rattan Accent Chair",           category: "Furniture",         slug: "furniture",         price: 22000, originalPrice: 27000, badge: "Sale",    rating: 4.7, reviewCount: 94,  inStock: true  },
    { id: "30", name: "Floating Wall Shelves 3pc",     category: "Furniture",         slug: "furniture",         price: 3800,                        badge: "New",     rating: 4.5, reviewCount: 66,  inStock: true  },
    { id: "31", name: "Bedside Table with Drawer",     category: "Furniture",         slug: "furniture",         price: 8700,  originalPrice: 10200, badge: "Hot",     rating: 4.6, reviewCount: 112, inStock: true  },
    { id: "32", name: "Foldable Coffee Table",         category: "Furniture",         slug: "furniture",         price: 6200,                        badge: "Limited", rating: 4.8, reviewCount: 58,  inStock: true  },
];

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
];

export const PRODUCTS_PER_PAGE = 8;
