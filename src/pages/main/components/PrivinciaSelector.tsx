import {Select} from "@mantine/core";
import React from "react";
import {Provincia} from "../../../domain/models/Provincia.model";
import useStore from "../../../domain/store/useStore";
import {useProvincias} from "../../../domain/swr";
import {selectOnChange} from "../../../domain/utils";


export const PrivinciaSelector = () => {
    const {provincia, setProvincia} = useStore();
    const {provincias, isLoading, isError} = useProvincias(); // Added isError

    // If loading, or if there's an error, or if provincias isn't available yet
    // render a disabled-like select. The global error will inform the user.
    if (isLoading || isError || !provincias) {
        return (
            <Select
                label="Provincia"
                py={'xl'}
                placeholder={isLoading ? "Cargando provincias..." : "Error al cargar provincias"}
                data={[]}
                disabled // Add disabled state
            />
        );
    }

    return (
        <Select
            label="Provincia"
            error={provincia.id == 0 ? 'Debes seleccionar una provincia' : ''}
            searchable
            p={'xl'}
            placeholder="Selecciona una provincia"
            value={provincia.id.toString() ?? ''}
            data={provincias.map(provinciasMap)} // Safe now due to the check above
            onChange={(value) => selectOnChange(value, provincias, setProvincia)}
        />
    )
}

const provinciasMap = (provincia: Provincia) =>({
    value: provincia.id.toString(),
    label: provincia.nombre
})

export default PrivinciaSelector