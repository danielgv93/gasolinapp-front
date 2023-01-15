import {BanknotesIcon} from "@heroicons/react/24/outline";
import {Card, Divider, HoverCard, Title} from "@mantine/core";
import React from "react";
import {Container} from "../../components";
import {GasIcon} from "../../components/icons/GasIcon";
import useStore from "../../domain/store/useStore";
import {fixedNumber} from "../../domain/utils";
import {RequestPrecio, KilometrosSelector, CombustibleSelector, PrivinciaSelector, ConsumoSelector} from "./components";
import {Footer} from "./Footer";

export const MainLayout = () => {
    const {precio, kilometros, consumo} = useStore();

    return (
        <Container >
            <RequestPrecio />
            <div className={'flex flex-col min-h-[calc(100%-68px)] gap-20 md:p-20 lg:py-20 lg:px-40 px-10'}>
                <div className={'flex justify-center'}>
                    <Title className={"font-['Montserrat, sans-serif'] tracking-widest"}>GASOLINAPP</Title>
                </div>
                <div className={'grid md:grid-cols-2 grid-cols-1 grid-flow-row lg:gap-x-20 gap-6'}>
                    <div className={'md:col-span-2 grid md:grid-cols-2 p-4 rounded-lg bg-white lg:gap-x-20 gap-6 '}>
                        <HoverCard withArrow position={'top'} >
                            <HoverCard.Target>
                                <div className={'w-full flex items-center justify-center rounded-md shadow hover:bg-blue-50 cursor-pointer transition-all p-6'}>
                                    <GasIcon className={'h-6 w-6 text-gray-600 mr-4'}/>
                                    <span className={'text-2xl transition-all'}>{fixedNumber(precio)} €/L</span>
                                </div>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                Precio del combustible
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <HoverCard withArrow position={'top'} >
                            <HoverCard.Target>
                                <div className={'w-full flex items-center justify-center rounded-md shadow hover:bg-blue-50 cursor-pointer transition-all p-6'}>
                                    <BanknotesIcon className={'h-6 w-6 text-gray-600 mr-4'}/>
                                    <span className={'text-2xl transition-all'}>{fixedNumber(precio * kilometros / 100 * consumo)} €</span>
                                </div>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                Coste del viaje
                            </HoverCard.Dropdown>
                        </HoverCard>
                    </div>
                    <Card radius={"md"} p={'xl'}>
                        <Title className={'text-2xl'}>Combustible</Title>
                        <Divider />
                        <PrivinciaSelector />
                        <CombustibleSelector />
                    </Card>
                    <Card radius={"md"} p={'xl'}>
                        <Title className={'text-2xl'}>Datos</Title>
                        <Divider />
                        <KilometrosSelector />
                        <ConsumoSelector />
                    </Card>
                </div>
            </div>

            <Footer />

        </Container>
    );
}

export default MainLayout