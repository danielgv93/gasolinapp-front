import {useEffect} from "react";
import useStore from "../../../domain/store/useStore";
import {usePrecio} from "../../../domain/swr";

export const RequestPrecio = () => {
    const {provincia, combustible, setPrecio} = useStore();
    // usePrecio will now not fetch if provincia.id or combustible.id is 0 or invalid
    const {precio: precioData, isLoading, isError} = usePrecio(provincia.id, combustible.id);

    useEffect(() => {
        if (isLoading) {
            // Optional: set precio to null while loading to avoid showing stale data.
            // setPrecio(null); 
            // For now, let's only set to null on error to minimize changes,
            // existing behavior shows old price until new one loads.
        } else if (isError) {
            setPrecio(null);
        } else if (precioData) {
            setPrecio(precioData.precio);
        }
        // If !isLoading && !isError && !precioData (e.g. initial state of usePrecio if key was null),
        // we might also want to setPrecio(null) or ensure it's handled.
        // The conditional fetch in usePrecio (if key is null, data is undefined) will lead to this state.
        // So, if provincia.id or combustible.id is 0, precioData will be undefined, isError is undefined, isLoading is false.
        // In this case, we should probably reflect that no price is available.
        else if (!provincia.id || !combustible.id) {
             setPrecio(null);
        }

    }, [provincia.id, combustible.id, precioData, isLoading, isError, setPrecio]); // Added provincia.id and combustible.id to dependencies

    return null;
}
export default RequestPrecio