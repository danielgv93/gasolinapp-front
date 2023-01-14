import {create, GetState, SetState} from "zustand";
import createProvincia, {ProvinciaState} from "./zustandCreate/createProvincia";
import createCombustible, {CombustibleState} from "./zustandCreate/createCombustible";
import createPrecio, {PrecioState} from "./zustandCreate/createPrecio";

type RootState = ProvinciaState & CombustibleState & PrecioState


const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
    ...createProvincia(set, get),
    ...createCombustible(set, get),
    ...createPrecio(set, get)
})

export const useStore = create<RootState>(createRootSlice)
export default useStore;

