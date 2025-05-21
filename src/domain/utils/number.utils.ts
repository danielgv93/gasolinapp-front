export const fixedNumber = (num: number | null): string => {
    if (num === null || isNaN(num)) {
        return "--";
    }
    return num.toFixed(2);
}