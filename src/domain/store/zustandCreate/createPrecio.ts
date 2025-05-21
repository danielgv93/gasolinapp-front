import StoreSlice from "./storeSlice";

export interface PrecioState {
    precio: number | null; // Changed
    setPrecio: (precio: number | null) => void; // Changed
}

export const createPrecio: StoreSlice<PrecioState> = (set) => ({
    precio: null, // Changed
    setPrecio: (precio: number | null) => set({precio}), // Changed
});

export default createPrecio;