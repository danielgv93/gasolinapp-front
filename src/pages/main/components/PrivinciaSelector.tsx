import {Select} from "@mantine/core";
import React, {useEffect} from "react";
import {useInputState} from "@mantine/hooks";
import {Provincia} from "../../../domain/models/Provincia.model";
import {fetchAllProvincias} from "../../../domain/services";
import useStore from "../../../domain/store/useStore";
import {selectOnChange} from "../../../domain/utils";


export const PrivinciaSelector = () => {
    const {provincia, setProvincia} = useStore();
    const [provincias, setProvincias] = useInputState<Provincia[]>([]);

    useEffect(() => {
        if (provincias.length !== 0) {
            return;
        }
        fetchAllProvincias().then((provincias) => {
            setProvincias(provincias);
        })
    }, [])


    return (
    <Select
        label="Provincia"
        searchable
        placeholder="Selecciona una provincia"
        value={provincia.id.toString() ?? ''}
        data={provincias.map(provinciasMap)}
        onChange={(value) => selectOnChange(value, provincias, setProvincia)}
    />
    )
}

const provinciasMap = (provincia: Provincia) =>({
    value: provincia.id.toString(),
    label: provincia.nombre
})

export default PrivinciaSelector