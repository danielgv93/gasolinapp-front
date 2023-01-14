
import React, {useState} from "react";
import {Container} from "../../components";
import useStore from "../../domain/store/useStore";
import {fixedNumber} from "../../domain/utils";
import {Precio} from "./components";
import CombustibleSelector from "./components/CombustibleSelector";
import KilometrosSelector from "./components/KilometrosSelector";
import PrivinciaSelector from "./components/PrivinciaSelector";

export const MainLayout = () => {
    const {precio, kilometros} = useStore();
    const [consumo, setConsumo] = useState(6.5)

    return (
        <Container>
            <Precio />
            <div className={'flex flex-row w-full justify-center gap-8'}>
                <PrivinciaSelector />
                <CombustibleSelector />
                <KilometrosSelector />
                <div className={'flex flex-row items-center pb-6 gap-2'}>
                    <span className={'text-2xl'}>{fixedNumber(precio)}</span>
                    <span className={'text-sm'}>€/L</span>
                </div>
                <div className={'flex flex-row items-center pb-6 gap-2'}>
                    <span className={'text-2xl'}>{fixedNumber(precio * kilometros / 100 * consumo)}</span>
                    <span className={'text-sm'}>€</span>
                </div>
            </div>
        </Container>
    );
}

export default MainLayout