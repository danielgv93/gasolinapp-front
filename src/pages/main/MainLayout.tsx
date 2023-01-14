import React from "react";
import {Container} from "../../components";
import useStore from "../../domain/store/useStore";
import {fixedNumber} from "../../domain/utils";
import {Precio, KilometrosSelector, CombustibleSelector, PrivinciaSelector, ConsumoSelector} from "./components";

export const MainLayout = () => {
    const {precio, kilometros, consumo} = useStore();

    return (
        <Container>
            <Precio />
            <div className={'flex flex-row flex-wrap w-full justify-center gap-8 p-10'}>
                <PrivinciaSelector />
                <CombustibleSelector />
                <div className={'flex flex-row items-center pb-6 gap-2'}>
                    <span className={'text-2xl'}>{fixedNumber(precio)}</span>
                    <span className={'text-sm'}>€/L</span>
                </div>
                <KilometrosSelector />
                <ConsumoSelector />
                <div className={'flex flex-row items-center pb-6 gap-2'}>
                    <span className={'text-2xl'}>{fixedNumber(precio * kilometros / 100 * consumo)}</span>
                    <span className={'text-sm'}>€</span>
                </div>
            </div>
        </Container>
    );
}

export default MainLayout