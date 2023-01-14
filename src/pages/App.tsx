import React, {useState} from 'react';
import PrivinciaSelector from "../components/PrivinciaSelector";
import useStore from "../domain/store/useStore";
import {fixedNumber} from "../domain/utils";

function App() {
    const {precio} = useStore();
    const [kms, setKms] = useState(25)
    const [consumo, setConsumo] = useState(6.5)

    return (
        <section className={'flex justify-center items-center w-screen h-screen bg-cyan-50 bg-gradient-to-tr from-fuchsia-100'}>
            <div className={'flex flex-row w-full justify-center gap-8'}>
                <PrivinciaSelector />
                <div className={'flex flex-row items-end gap-2'}>
                    <span className={'text-2xl'}>{fixedNumber(precio)}</span>
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
