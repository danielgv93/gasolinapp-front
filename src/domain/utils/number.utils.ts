export const fixedNumber = (num: number) => {
    if (isNaN(num) || !num) {
        return 0;
    }
    return num.toFixed(2);
}