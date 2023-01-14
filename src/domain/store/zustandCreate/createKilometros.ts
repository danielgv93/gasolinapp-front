import StoreSlice from "./storeSlice";

export interface KilometrosState {
    kilometros: number
    setKilometros: (kilometros: number) => void
}

export const createKilometros: StoreSlice<KilometrosState> = (set) => ({
    kilometros: 25,
    setKilometros: (kilometros: number) => set({kilometros})
})

export default createKilometros;