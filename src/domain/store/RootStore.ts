import {
    CombustibleState,
    ConsumoState,
    KilometrosState,
    PrecioState,
    ProvinciaState
} from "./zustandCreate";

export type RootState =
    ProvinciaState
    & CombustibleState
    & PrecioState
    & KilometrosState
    & ConsumoState