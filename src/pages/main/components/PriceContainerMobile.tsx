import {BanknotesIcon} from "@heroicons/react/24/outline";
import React from "react";
import {HoverCard} from "../../../components/HoverCard";
import {GasIcon} from "../../../components/icons/GasIcon";
import {Text} from "../../../components/Text";
import {useStore} from "../../../domain/store";
import {fixedNumber} from "../../../domain/utils";
import {PriceContent} from "./PriceCard";
import {TotalPriceContent} from "./TotalPriceCard";

export const PriceContainerMobile = () => {
    const {precio, kilometros, consumo} = useStore();
    return(
        <div className={'sticky block bottom-0 w-full h-28  z-20 flex justify-evenly items-center md:hidden'}>
            <div className={'w-full h-full absolute bg-primary-10/90 backdrop-blur -z-10'} />
            <HoverCard content={<PriceContent />}>
                <div className={'flex flex-col items-center'}>
                    <GasIcon className={'h-6 w-6 text-font mr-4'}/>
                    <Text className={'text-2xl transition-all'}>{fixedNumber(precio)} €/L</Text>
                </div>
            </HoverCard>
            <HoverCard content={<TotalPriceContent />}>
                <div className={'flex flex-col items-center'}>
                    <BanknotesIcon className={'h-6 w-6 text-font mr-4'}/>
                    <Text className={'text-2xl transition-all'}>{fixedNumber(precio * kilometros / 100 * consumo)} €</Text>
                </div>
            </HoverCard>
        </div>
    )
}
export default PriceContainerMobile;