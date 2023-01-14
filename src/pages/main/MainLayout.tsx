
import React, {useState} from "react";
import {Container} from "../../components";
import useStore from "../../domain/store/useStore";
import {fixedNumber} from "../../domain/utils";
import PrivinciaSelector from "./components/PrivinciaSelector";

export const MainLayout = () => {
    const {precio} = useStore();
    const [kms, setKms] = useState(25)
    const [consumo, setConsumo] = useState(6.5)

    return (
        <Container>
            <div className={'flex flex-row w-full justify-center gap-8'}>
                <PrivinciaSelector />
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