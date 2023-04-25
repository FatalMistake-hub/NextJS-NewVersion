import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Box,
    SliderMark,
    NumberInput,
    NumberInputField,
    Stack,
    Center,
    Text,
    Divider,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsSliders2Vertical } from 'react-icons/bs';
const PriceRange: React.FC = () => {
    const [sliderValue, setSliderValue] = useState(50);

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
        borderRadius: 'lg',
    };
    const format = (val: string) => `$` + val;
    const parse = (val: string) => val.replace(/^\$/, '');

    const [value, setValue] = React.useState('1.53');
    const [value2, setValue2] = React.useState('10');
    return (
        <div className="flex flex-col items-start w-full pl-4 pr-4">
            <div className="text-base ">Giá trung bình cho một trải nghiệm là $45.</div>
            <div className="w-full mt-2">
                <Box pt={6} pb={2}>
                    <RangeSlider aria-label={['min', 'max']} defaultValue={[30, 80]}>
                        <RangeSliderTrack bg="gray.100">
                            <RangeSliderFilledTrack bg="teal" />
                        </RangeSliderTrack>
                        <RangeSliderThumb boxSize={6} index={0}>
                            <Box color="teal" as={BsSliders2Vertical} />
                        </RangeSliderThumb>
                        <RangeSliderThumb boxSize={6} index={1}>
                            <Box color="teal" as={BsSliders2Vertical} />
                        </RangeSliderThumb>
                    </RangeSlider>
                </Box>
                <Stack direction="row" justifyContent={'center'} width={'full'} my={4}>
                    <div className="">
                        <Text mb="8px">Giá tối thiểu:</Text>
                        <NumberInput width="auto" onChange={(valueString) => setValue(parse(valueString))} value={format(value)} max={50}>
                            <NumberInputField />
                        </NumberInput>
                    </div>

                    <div className="flex flex-col justify-center pt-6 text-3xl">-</div>

                    <div>
                        <Text mb="8px">Giá tối đa:</Text>
                        <NumberInput width="auto" onChange={(valueString) => setValue2(parse(valueString))} value={format(value2)} max={50}>
                            <NumberInputField />
                        </NumberInput>
                    </div>
                </Stack>
            </div>
        </div>
    );
};

export default PriceRange;
