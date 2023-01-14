export const getLocalStorage = <T extends any>(setState: (state: T) => void, key: string) => {
    const storage = localStorage.getItem('gasolinapp');
    if (!storage) {
        return;
    }
    setState(JSON.parse(storage).state[key]);
};