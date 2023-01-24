import React from "react";
import {Card, Divider, Image, Title} from "@mantine/core";
import {Container} from "../../components";
import {Text} from "../../components/Text";
import {RequestPrecio, KilometrosSelector, CombustibleSelector, PrivinciaSelector, ConsumoSelector} from "./components";
import {PriceCard, PriceContainerMobile, TotalPriceCard} from "./components";
import {Footer} from "./Footer";

export const MainLayout = () => {

    return (
        <Container >
            <RequestPrecio />

            <div className={'flex flex-col gap-14 md:gap-20 p-26 pt-10 md:p-20 pb-32 lg:px-40 px-10'}>
                <div className={'flex sm:flex-row flex-col items-center sm:justify-center'}>
                    <Image src={`${process.env.PUBLIC_URL}/logo.png`} width={50} height={50} />
                    <Title className={"font-['Montserrat, sans-serif'] text-[#32353b] tracking-widest italic"}>GASOLINAPP</Title>
                </div>
                <div className={'grid md:grid-cols-2 grid-cols-1 grid-flow-row lg:gap-x-20 gap-6'}>
                    <div className={'md:col-span-2 grid md:grid-cols-2 p-4 rounded-lg bg-white lg:gap-x-20 gap-6 hidden md:grid'}>
                        <PriceCard />
                        <TotalPriceCard />
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
            <PriceContainerMobile />
            <Footer />

        </Container>
    );
}

export default MainLayout