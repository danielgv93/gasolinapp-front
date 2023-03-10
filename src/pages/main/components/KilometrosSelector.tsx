import {Box, NumberInput, Slider} from "@mantine/core";
import {useInputState} from "@mantine/hooks";
import {Text} from "../../../components/Text";
import useStore from "../../../domain/store/useStore";

export const KilometrosSelector = () => {
    const {kilometros, setKilometros} = useStore();
    const [sliderPreviewValue, setSliderPreviewValue] = useInputState(kilometros);
    return (
        <Box p={'xl'}>
            <NumberInput
                label={'Kilometros'}
                value={kilometros}
                min={0}
                icon={<Text className={'text-gray-500 text-sm'}>Km</Text>}
                stepHoldDelay={500}
                stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                onChange={(val) => {
                    if(!val) {
                        return;
                    }
                    setSliderPreviewValue(val);
                    setKilometros(val);}
                }
            />
            <Slider
                label={(val) => `${val} Kilometros`}
                color={'green'}
                className={'w-full'}
                min={0}
                max={Math.max(100, (kilometros > 90 ? kilometros * 2 : kilometros))}
                value={sliderPreviewValue}
                onChange={setSliderPreviewValue}
                onChangeEnd={setKilometros}
                py={'xl'} />
        </Box>

    )
}
export default KilometrosSelector