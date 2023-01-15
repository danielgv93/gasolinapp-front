import {useEffect} from "react";
import useStore from "../../../domain/store/useStore";
import {usePrecio} from "../../../domain/swr";

export const RequestPrecio = () => {
    const {provincia, setPrecio, combustible} = useStore();
    const {precio} = usePrecio(provincia.id, combustible.id);
    useEffect(() => {
        if (!precio) {
            return;
        }
        setPrecio(precio.precio)

    }, [precio])
    return null;
}
export default RequestPrecio