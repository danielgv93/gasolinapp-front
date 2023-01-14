import StoreSlice from "./storeSlice";

export interface ConsumoState {
    consumo: number
    setConsumo: (consumo: number) => void
}

export const createConsumo: StoreSlice<ConsumoState> = (set) => ({
    consumo: 5.0,
    setConsumo: (consumo: number) => set({consumo})
})

export default createConsumo;