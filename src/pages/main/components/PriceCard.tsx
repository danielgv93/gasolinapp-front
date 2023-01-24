import React from "react";
import {HoverCard} from "../../../components/HoverCard";
import {GasIcon} from "../../../components/icons/GasIcon";
import {Text} from "../../../components/Text";
import {useStore} from "../../../domain/store";
import {fixedNumber} from "../../../domain/utils";

export const PriceCard = () => {
    const {precio} = useStore();

    return (
        <HoverCard content={<PriceContent />}>
            <div className={'w-full flex items-center justify-center rounded-md hover:bg-blue-50 hover:shadow cursor-pointer transition-all p-6'}>
                <GasIcon className={'h-6 w-6 text-font mr-4'}/>
                <Text className={'text-2xl transition-all'}>{fixedNumber(precio)} €/L</Text>
            </div>
        </HoverCard>
    )
}

export default PriceCard;

export const PriceContent = () => {
    return (
        <div className={'md:max-w-xl max-w-xs'}>
            <Text className={'font-bold pl-4'}>Precio del combustible</Text>
            <Text className={'text-sm'}>Este dato esta calculado como la media de los precios del combustible seleccionado de las gasolineras de la provincia seleccionada.</Text>
        </div>
    )
}