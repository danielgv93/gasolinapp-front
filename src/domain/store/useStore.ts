import {create, GetState, SetState} from "zustand";
import {devtools} from "zustand/middleware";
import {RootState} from "./RootStore";
import {
    createCombustible,
    createConsumo,
    createKilometros,
    createPrecio,
    createProvincia
} from "./zustandCreate";

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
    ...createProvincia(set, get),
    ...createCombustible(set, get),
    ...createPrecio(set, get),
    ...createKilometros(set, get),
    ...createConsumo(set, get)
})

//export const useStore = create<RootState>()(devtools(persist(createRootSlice, {
//    name: 'gasolinapp',
//})))
export const useStore = create<RootState>()(devtools(createRootSlice))
export default useStore;

