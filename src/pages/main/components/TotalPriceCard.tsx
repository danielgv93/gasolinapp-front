import {BanknotesIcon} from "@heroicons/react/24/outline";
import React from "react";
import {HoverCard} from "../../../components/HoverCard";
import {Text} from "../../../components/Text";
import {useStore} from "../../../domain/store";
import {fixedNumber} from "../../../domain/utils";

export const TotalPriceCard = () => {
    const {precio, kilometros, consumo} = useStore();

    return (
        <HoverCard content={<TotalPriceContent /> }>
            <div className={'w-full flex items-center justify-center rounded-md hover:bg-blue-50 hover:shadow cursor-pointer transition-all p-6'}>
                <BanknotesIcon className={'h-6 w-6 text-font mr-4'}/>
                <Text className={'text-2xl transition-all'}>{fixedNumber(precio * kilometros / 100 * consumo)} €</Text>
            </div>
        </HoverCard>
    )
}

export default TotalPriceCard;

export const TotalPriceContent = () => {
    return (
        <div className={'md:max-w-xl max-w-xs'}>
            <Text className={'font-bold pl-4'}>Coste del viaje</Text>
            <Text className={'text-sm'}>Teniendo en cuenta el coste del combustible, el coste total se calcula como el precio del combustible por los kilometros que se van a recorrer por el consumo del vehiculo.</Text>
        </div>
    )
}