export interface Combustible {
    id: number;
    nombre: CombustibleType;
}

export const Combustibles = ['Gasolina95', 'Gasolina98', 'Diesel']
export type CombustibleType = typeof Combustibles[number]