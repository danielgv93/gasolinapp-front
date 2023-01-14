export interface Combustible {
    id: number;
    nombre: CombustibleType;
}

export const CombustibleNames = ['Gasolina95', 'Gasolina98', 'Diesel']
export type CombustibleType = typeof CombustibleNames[number]