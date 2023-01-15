import {BanknotesIcon} from "@heroicons/react/24/outline";
import {Card, Divider, HoverCard, Image, Text, Title} from "@mantine/core";
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
            <div className={'flex flex-col gap-20 p-20 pb-32 lg:px-40 px-10'}>
                <div className={'flex sm:flex-row flex-col items-center sm:justify-center'}>
                    <Image src={`${process.env.PUBLIC_URL}/logo.png`} width={50} height={50} />
                    <Title className={"font-['Montserrat, sans-serif'] text-[#32353b] tracking-widest italic"}>GASOLINAPP</Title>
                </div>
                <div className={'grid md:grid-cols-2 grid-cols-1 grid-flow-row lg:gap-x-20 gap-6'}>
                    <div className={'md:col-span-2 grid md:grid-cols-2 p-4 rounded-lg bg-white lg:gap-x-20 gap-6 '}>
                        <HoverCard withArrow closeDelay={0} position={'top'} >
                            <HoverCard.Target>
                                <div className={'w-full flex items-center justify-center rounded-md hover:bg-blue-50 hover:shadow cursor-pointer transition-all p-6'}>
                                    <GasIcon className={'h-6 w-6 text-gray-600 mr-4'}/>
                                    <span className={'text-2xl transition-all'}>{fixedNumber(precio)} €/L</span>
                                </div>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                <div className={'md:max-w-xl max-w-xs'}>
                                    <Text className={'font-bold pl-4'}>Precio del combustible</Text>
                                    <Text className={'text-sm'}>Este dato esta calculado como la media de los precios del combustible seleccionado de las gasolineras de la provincia seleccionada.</Text>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <HoverCard withArrow closeDelay={0} position={'top'} >
                            <HoverCard.Target>
                                <div className={'w-full flex items-center justify-center rounded-md hover:bg-blue-50 hover:shadow cursor-pointer transition-all p-6'}>
                                    <BanknotesIcon className={'h-6 w-6 text-gray-600 mr-4'}/>
                                    <span className={'text-2xl transition-all'}>{fixedNumber(precio * kilometros / 100 * consumo)} €</span>
                                </div>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                <div className={'md:max-w-xl max-w-xs'}>
                                    <Text className={'font-bold pl-4'}>Coste del viaje</Text>
                                    <Text className={'text-sm'}>Teniendo en cuenta el coste del combustible, el coste total se calcula como el precio del combustible por los kilometros que se van a recorrer por el consumo del vehiculo.</Text>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard>
                    </div>
                    <Card radius={"md"} p={'xl'}>
                        <Text className={'text-2xl font-bold'}>Combustible</Text>
                        <Divider />
                        <PrivinciaSelector />
                        <CombustibleSelector />
                    </Card>
                    <Card radius={"md"} p={'xl'}>
                        <Text className={'text-2xl font-bold'}>Datos</Text>
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