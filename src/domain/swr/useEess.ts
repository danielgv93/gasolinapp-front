import useSWR from "swr";
import {Api} from "../core";
import {Precio} from "../models";

export const usePrecio = (provincia: number, producto: number) => {
    const {data, error} = useSWR<Precio>(`${Api.baseUrl}/api/eess/${provincia}/${producto}`);
    return {
        precio: data,
        isLoading: !error && !data,
        isError: error,
    };
}