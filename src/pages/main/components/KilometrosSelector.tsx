import {Box, NumberInput, Slider, Text} from "@mantine/core";
import {useInputState} from "@mantine/hooks";
import useStore from "../../../domain/store/useStore";

export const KilometrosSelector = () => {
    const {kilometros, setKilometros} = useStore();
    const [sliderPreviewValue, setSliderPreviewValue] = useInputState(kilometros);
    return (
        <Box py={'xl'}>
            <NumberInput
                label={'Kilometros'}
                value={kilometros}
                min={0}
                icon={<Text>Km</Text>}
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
                label={(val) => <Text>{`${val} Kilometros`}</Text>}
                className={'w-full'}
                min={0}
                max={Math.max(100, (kilometros + 100))}
                value={sliderPreviewValue}
                onChange={setSliderPreviewValue}
                onChangeEnd={setKilometros}
                py={'xl'} />
        </Box>

    )
}
export default KilometrosSelector