import {Select} from "@mantine/core";
import React, {useEffect} from "react";
import {fetchAllProvincias, getPrecioByProvProd} from "../domain/services";
import useStore from "../domain/store/useStore";
import {Provincia} from "../domain/models/Provincia.model";
import {useInputState} from "@mantine/hooks";

const PrivinciaSelector = () => {
    const {provincia, setProvincia, setPrecio} = useStore();
    const [provincias, setProvincias] = useInputState<Provincia[]>([]);

    useEffect(() => {
        if (provincias.length !== 0) {
            return;
        }
        fetchAllProvincias().then((provincias) => {
            setProvincias(provincias);
        })
    }, [])

    useEffect(() => {
        getPrecioByProvProd(provincia.id, 1).then(res => {
            setPrecio(res.precio)
        })
    }, [provincia.nombre])
    if (provincias.length === 0) {
        return <div>Loading...</div>
    }
    return (
    <Select
        label="Provincia"
        searchable
        placeholder="Selecciona una provincia"
        data={provincias.map(provinciasMap)}
        onChange={(value) => {
            if (value === null) {
                return;
            }
            const element = provincias.find(el => el.id.toString() === value)
            if (!element) {
                return;
            }
            setProvincia(element)
        }}
    />
    )
}

const provinciasMap = (provincia: Provincia) =>({
    value: provincia.id.toString(),
    label: provincia.nombre
})

export default PrivinciaSelector