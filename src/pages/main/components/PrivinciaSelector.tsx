import {Select} from "@mantine/core";
import React from "react";
import {Provincia} from "../../../domain/models/Provincia.model";
import useStore from "../../../domain/store/useStore";
import {useProvincias} from "../../../domain/swr";
import {selectOnChange} from "../../../domain/utils";


export const PrivinciaSelector = () => {
    const {provincia, setProvincia} = useStore();
    const {provincias, isLoading} = useProvincias();

    if (isLoading) {
        return (
            <Select
                label="Provincia"
                p={'xl'}
                placeholder="Selecciona una provincia"
                data={[]} />);
    }

    return (
    <Select
        label="Provincia"
        searchable
        p={'xl'}
        placeholder="Selecciona una provincia"
        value={provincia.id.toString() ?? ''}
        data={provincias!.map(provinciasMap)}
        onChange={(value) => selectOnChange(value, provincias!, setProvincia)}
    />
    )
}

const provinciasMap = (provincia: Provincia) =>({
    value: provincia.id.toString(),
    label: provincia.nombre
})

export default PrivinciaSelector