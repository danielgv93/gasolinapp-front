import {NumberInput, Slider, Text} from "@mantine/core";
import {useInputState} from "@mantine/hooks";
import useStore from "../../../domain/store/useStore";

export const ConsumoSelector = () => {
    const {consumo, setConsumo} = useStore();
    const [sliderPreviewValue, setSliderPreviewValue] = useInputState(consumo);

    return (
        <div className={'flex flex-col'}>
            <NumberInput
                label={'Consumo L/100Km'}
                value={consumo}
                min={0}
                max={10}
                step={0.1}
                precision={1}
                stepHoldDelay={500}
                stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                onChange={(val) => {
                    if(!val) {
                        return;
                    }
                    setSliderPreviewValue(val);
                    setConsumo(val);}
                }
            />
            <Slider
                label={(val) => <Text>{`${val.toFixed(1)} L/100Km`}</Text>}
                className={'w-full'}
                min={0}
                max={Math.max(10, (consumo + 1))}
                step={0.1}
                value={sliderPreviewValue}
                onChange={setSliderPreviewValue}
                onChangeEnd={setConsumo}
                py={'xl'} />
        </div>
    )
}

export default ConsumoSelector