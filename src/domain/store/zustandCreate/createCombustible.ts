import StoreSlice from "./storeSlice";
import {Combustible} from "../../models/Combustible.model";

export interface CombustibleState {
    combustible: Combustible
    setCombustible: (combustible: Combustible) => void
}

const createCombustible: StoreSlice<CombustibleState> = (set) => ({
    combustible: {
        id: 0,
        nombre: ''
    },
    setCombustible: (combustible: Combustible) => set({combustible})
})

export default createCombustible;