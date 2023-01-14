import {useEffect} from "react";
import {getPrecioByProvProd} from "../../../domain/services";
import useStore from "../../../domain/store/useStore";

export const Precio = () => {
    const {provincia, setPrecio, combustible} = useStore();

    useEffect(() => {
        getPrecioByProvProd(provincia.id, combustible.id).then(res => {
            if (!res.precio) {
                return;
            }
            setPrecio(res.precio)
        })
    }, [provincia.nombre, combustible])
    return null;
}