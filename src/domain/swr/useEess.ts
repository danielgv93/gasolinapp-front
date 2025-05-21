import useSWR from "swr";
import { Api } from "../core";
import { Precio } from "../models"; // Assuming Precio model might need to allow for null if data structure implies it

export const usePrecio = (provincia: number, producto: number) => {
    const { data, error, isLoading } = useSWR<Precio>( // Added isLoading from SWR
        (provincia && producto) ? `${Api.baseUrl}/api/eess/${provincia}/${producto}` : null // Prevent fetch if provincia or producto is falsy (e.g. 0 or undefined)
    );

    return {
        precio: data,       // data will be undefined if loading, error, or if key is null
        isLoading: isLoading, // Use SWR's isLoading
        isError: error,     // Error object from SWR
    };
}