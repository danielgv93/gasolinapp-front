import StoreSlice from "./storeSlice";

export interface PrecioState {
    precio: number
    setPrecio: (combustible: number) => void
}

const createPrecio: StoreSlice<PrecioState> = (set) => ({
    precio: 0,
    setPrecio: (precio: number) => set({precio})
})

export default createPrecio;