export function getPagesCount(
    itemsCount: number,
    limit: number
): number {
    return Math.ceil(itemsCount / limit);
}