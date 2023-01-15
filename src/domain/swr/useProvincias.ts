import useSWR from "swr";
import {Api} from "../core";
import {Provincia} from "../models/Provincia.model";

export const useProvincias = () => {
    const {data, error} = useSWR<Provincia[]>(`${Api.baseUrl}/api/provincias`);
    return {
        provincias: data,
        isLoading: !error && !data,
        isError: error,
    };
}