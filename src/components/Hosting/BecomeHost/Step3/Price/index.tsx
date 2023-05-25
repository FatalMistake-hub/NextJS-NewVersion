import { VStack, Text, Heading, Box, useNumberInput, Button, HStack, Input } from '@chakra-ui/react';

import { ChangeEvent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/redux/hook';
import { selectBecomeHost, SET_btnSTATUS, SET_priceOnePerson, SET_TITLE } from 'src/redux/slice/becomeHostSlice';
const PriceSt3 = () => {
    const { tour } = useAppSelector(selectBecomeHost);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (tour.priceOnePerson === null) {
            dispatch(SET_btnSTATUS(true));
        } else {
            dispatch(SET_btnSTATUS(false));
        }
        return () => {};
    }, [tour.priceOnePerson]);

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, value } = useNumberInput({
        step: 10000,
        defaultValue: 200000,
        min: 10000,
        max: 1000000000,
        precision: 0,
    });
    useEffect(() => {
        if (Number(value) < 100000000) dispatch(SET_priceOnePerson(Number(value)));
        return () => {};
    }, [value]);

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    const formattedValue = `${value.toLocaleString()}₫`;
    console.log(value);
    return (
        <>
            <div className="w-full justify-center items-center flex min-h-[calc(100vh-176px)] px-20">
                <VStack w={'700px'} align={'left'} gap={2}>
                    <Heading lineHeight={1.2} as="h1" fontSize={'32px'} fontWeight={'600'} width={'full'} letterSpacing={'tight'}>
                        Cuối cùng, hãy đặt mức giá mà bạn muốn
                    </Heading>
                    <Text fontSize={'18px'} fontWeight={'400'} pb={4} color={'gray.600'}>
                        Bạn có thể thay đổi giá này bất cứ lúc nào.
                    </Text>
                    <Box
                        w={'full'}
                        h={'300px'}
                        bgColor={'blackAlpha.100'}
                        rounded={'xl'}
                        boxShadow={'sm'}
                        border={'1px solid #50505028'}
                        p={10}
                    >
                        <VStack w={'full'} align={'center'} gap={2}>
                            <HStack maxW="90%" spacing={8} pb={6}>
                                <Button
                                    className="py-6"
                                    rounded={'full'}
                                    bgColor={'white'}
                                    color={'black'}
                                    border={'1px solid #00000055'}
                                    colorScheme={'whiteAlpha'}
                                    size={'lg'}
                                    boxShadow={'sm'}
                                    {...dec}
                                >
                                    -
                                </Button>
                                <Input
                                    size={'lg'}
                                    bgColor={'white'}
                                    focusBorderColor={'blackAlpha.500'}
                                    textAlign={'center'}
                                    fontSize={'48px'}
                                    boxShadow={'md'}
                                    fontWeight={600}
                                    p={12}
                                    rounded={'xl'}
                                    {...input}
                                    value={formattedValue}
                                    max={100000000}
                                />
                                <Button
                                    className="py-6"
                                    rounded={'full'}
                                    bgColor={'white'}
                                    color={'black'}
                                    border={'1px solid #00000055'}
                                    colorScheme={'whiteAlpha'}
                                    size={'lg'}
                                    boxShadow={'sm'}
                                    {...inc}
                                >
                                    +
                                </Button>
                            </HStack>

                            <Text fontSize={'18px'} w={'50%'} fontWeight={'400'} align={'center'}>
                                Tính phí bao nhiêu là hoàn toàn tùy thuộc vào bạn. Hãy nhập giá bạn muốn mỗi khách phải trả.
                            </Text>
                        </VStack>
                    </Box>
                </VStack>
            </div>
        </>
    );
};

export default PriceSt3;
