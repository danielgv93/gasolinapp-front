import {Api} from "../core";
import {Precio} from "../models";


export const getPrecioByProvProd = async (provincia: number, producto: number): Promise<Precio> => {
    const data = await fetch(`${Api.baseUrl}/api/eess/${provincia}/${producto}`);
    return data.json();
}