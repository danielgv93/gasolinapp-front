

export const selectOnChange = <T extends { id: number }>(value: string | null, options: T[], setStore: (element:T) => void) => {
    if (value === null) {
        return;
    }
    const element = options.find(el => el.id.toString() === value)
    if (!element) {
        return;
    }
    setStore(element)
}