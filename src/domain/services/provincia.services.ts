import {Provincia} from "../models/Provincia.model";
import {Api} from "../core";

export const fetchProvincias = async (provinciaName: string): Promise<Provincia[]> => {
    const data = await fetch(`${Api.baseUrl}/api/provincias/${provinciaName}`);
    return data.json();
}

export const fetchAllProvincias = async (): Promise<Provincia[]> => {
    const data = await fetch(`${Api.baseUrl}/api/provincias`);
    return data.json();
}