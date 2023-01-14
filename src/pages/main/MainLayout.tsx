
import React, {useState} from "react";
import {Container} from "../../components";
import useStore from "../../domain/store/useStore";
import {fixedNumber} from "../../domain/utils";
import {Precio} from "./components";
import CombustibleSelector from "./components/CombustibleSelector";
import PrivinciaSelector from "./components/PrivinciaSelector";

export const MainLayout = () => {
    const {precio} = useStore();
    const [kms, setKms] = useState(25)
    const [consumo, setConsumo] = useState(6.5)

    return (
        <Container>
            <Precio />
            <div className={'flex flex-row w-full justify-center gap-8'}>
                <PrivinciaSelector />
                <CombustibleSelector />
                <div className={'flex flex-row items-end gap-2'}>
                    <span className={'text-2xl'}>{fixedNumber(precio)}</span>
                    <span className={'text-sm'}>€/L</span>
                </div>
                <div className={'flex flex-row items-end gap-2'}>
                    <span className={'text-2xl'}>{fixedNumber(precio * kms / 100 * consumo)}</span>
                    <span className={'text-sm'}>€</span>
                </div>
            </div>
        </Container>
    );
}

export default MainLayout