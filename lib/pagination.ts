export function generatePagination(currentPage: number, totalPages: number) {
    // If total pages is 7 or less, show all pages
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If current page is among the first 3 pages
    // Show: 1, 2, 3, 4, ..., totalPages
    if (currentPage <= 3) {
        return [1, 2, 3, 4, '...', totalPages];
    }

    // If current page is among the last 3 pages
    // Show: 1, ..., totalPages - 3, totalPages - 2, totalPages - 1, totalPages
    if (currentPage >= totalPages - 2) {
        return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    // If current page is somewhere in the middle
    // Show: 1, ..., currentPage - 1, currentPage, currentPage + 1, ..., totalPages
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
}
