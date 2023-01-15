import {Select} from "@mantine/core";
import {Combustible} from "../../../domain/models/Combustible.model";
import useStore from "../../../domain/store/useStore";
import {selectOnChange} from "../../../domain/utils";

export const CombustibleSelector = () => {
    const {combustible, setCombustible} = useStore();
    const combustibles: Combustible[] = [
        {
            id: 1,
            nombre: 'Gasolina 95'
        },
        {
            id: 3,
            nombre: 'Gasolina 98'
        },
        {
            id: 4,
            nombre: 'Diesel'
        }
    ]

    const combustiblesMap = (combustible: Combustible) => ({
        value: combustible.id.toString(),
        label: combustible.nombre
    })
    return (
        <Select
            label="Combustible"
            p={'xl'}
            value={combustible.id.toString() ?? ''}
            data={combustibles.map(combustiblesMap)}
            onChange={value => selectOnChange(value, combustibles, setCombustible)} />
    )
}

export default CombustibleSelector