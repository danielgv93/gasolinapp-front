import StoreSlice from "./storeSlice";
import {Provincia} from "../../models/Provincia.model";

export interface ProvinciaState {
    provincia: Provincia
    setProvincia: (provincia: Provincia) => void
}

const createProvincia: StoreSlice<ProvinciaState> = (set) => ({
    provincia: {
        id: 0,
        nombre: ""
    },
    setProvincia: (provincia: Provincia) => set({provincia})
})

export default createProvincia;