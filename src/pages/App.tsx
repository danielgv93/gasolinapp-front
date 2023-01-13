import React, {useEffect, useState} from 'react';
import {Autocomplete} from "@mantine/core";
import {fetchAllProvincias, fetchProvincias, getPrecioByProvProd} from "../domain/services";
import {Provincia} from "../domain/models/Provincia.model";

function App() {
    const [provincias, setProvincias] = useState<string[]>([]);
    const [provincia, setProvincia] = useState<Provincia>({
        id: 0,
        nombre: '',
    })
    const [precio, setPrecio] = useState(0)
    const [kms, setKms] = useState(25)
    const [consumo, setConsumo] = useState(6.5)

    useEffect(() => {
        fetchAllProvincias().then((provincias) => {
            const provinciasParsed = provincias.map((provincia) => provincia.nombre)
            setProvincias(provinciasParsed);
        })
    }, [])

    useEffect(() => {
        fetchProvincias(provincia.nombre).then((provincias) => {
            console.log('fetchProvincias', provincias)
            if (provincias.length !== 1) {
                return
            }
            const provincia = provincias[0]
            setProvincia(provincia)
            getPrecioByProvProd(provincia.id, 1).then(res => {
                setPrecio(res.precio)
            })
        })

    }, [provincia.nombre])

    return (
        <section className={'flex justify-center items-center w-screen h-screen bg-cyan-50 bg-gradient-to-tr from-fuchsia-100'}>
            <div className={'flex flex-row w-full justify-center gap-8'}>
                <Autocomplete
                    label="Provincia"
                    placeholder="Selecciona una provincia"
                    data={provincias}
                    onChange={(value) => setProvincia({...provincia, nombre: value})}
                />
                <div className={'flex flex-row items-end gap-2'}>
                    <span className={'text-2xl'}>{precio.toFixed(2)}</span>
                    <span className={'text-sm'}>€/L</span>
                </div>
                <div className={'flex flex-row items-end gap-2'}>
                    <span className={'text-2xl'}>{(precio * kms / 100 * consumo).toFixed(2)}</span>
                    <span className={'text-sm'}>€</span>
                </div>
            </div>
        </section>
    );
}

export default App;
