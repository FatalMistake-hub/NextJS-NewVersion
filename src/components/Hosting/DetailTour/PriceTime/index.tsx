import {
    VStack,
    StackDivider,
    Button,
    Text,
    useDisclosure,
    Fade,
    Box,
    Textarea,
    HStack,
    Input,
    useNumberInput,
    Select,
} from '@chakra-ui/react';
import TourFormWrapper from '@components/Wrapper/TourFormWrapper';
import { useEffect, ChangeEvent } from 'react';
import { SET_priceOnePerson } from 'src/redux/slice/becomeHostSlice';
import { listTimeSlot, numberToTime, TimeFrameListStart, timeToMinute, TimeFrameListEnd } from 'src/utils/dateUntils';

const PriceTime = () => {
    const { isOpen, onToggle } = useDisclosure();
    const Disclosure1 = useDisclosure();
    const Disclosure2 = useDisclosure();
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, value } = useNumberInput({
        step: 10000,
        defaultValue: 200000,
        min: 10000,
        max: 1000000000,
        precision: 0,
    });
    useEffect(() => {
        // if (Number(value) < 100000000) dispatch(SET_priceOnePerson(Number(value)));
        // return () => {};
    }, [value]);

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        //  setSelectedOption(event.target.value);
        // dispatch(SET_TIMESLOTLENGTH(Number(event.target.value)));
    };
    const handleSelectChange2 = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value !== '0') {
            // dispatch(SET_TIMEBOOKSTART(minuteToTime(event.target.value)));
        }
    };
    const handleSelectChange1 = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value !== '0') {
            // dispatch(SET_TIMEBOOKEND(minuteToTime(event.target.value)));
        }
    };
    const lisTimeSlot = listTimeSlot();
    const formattedValue = `${value.toLocaleString()}₫`;

    const timeListStart = TimeFrameListStart(120);
    // const timeListStart = TimeFrameListStart(tour.timeSlotLength);
    let timeListEnd = [
        {
            hour: 0,
            minutes: 0,
        },
    ];
    // if (tour.timeBookStart.hour !== undefined && tour.timeBookStart.minutes !== undefined) {
    //     timeListEnd = TimeFrameListEnd(timeToMinute(tour.timeBookStart), tour.timeSlotLength);
    // }
    return (
        <>
            <VStack divider={<StackDivider borderColor="black.200" />} align="stretch" width={'full'} spacing={6}>
                <Box>
                    <div className="py-2 flex items-start justify-between w-full">
                        <div>
                            <Text mb={1} fontSize={'16px'} fontWeight={400}>
                                Định giá
                            </Text>
                            <Text mb={1} fontSize={'14px'} color={'gray.600'}>
                                ₫234475
                            </Text>
                        </div>
                        <div className="flex flex-col items-end">
                            <Button
                                size={'sm'}
                                variant={'ghost'}
                                textDecoration={'underline'}
                                color={'black'}
                                rounded={'lg'}
                                onClick={onToggle}
                            >
                                {!isOpen ? 'Chỉnh sửa' : 'Thu gọn'}
                            </Button>
                        </div>
                    </div>
                    <Fade in={isOpen}>
                        <Box display={isOpen ? 'block' : 'none'}>
                            <TourFormWrapper>
                                <Text
                                    fontSize={'16px'}
                                    fontWeight={'600'}
                                    width={'full'}
                                    // noOfLines={2}
                                    letterSpacing={'tight'}
                                >
                                    Hãy đặt mức giá mà bạn muốn
                                </Text>
                                {/* <Text fontSize={'14px'} fontWeight={'400'}>
                                    Tạo một tiêu đề mô tả sắc nét và độc đáo để khách hàng hiểu rõ về những gì bạn đang cung cấp.
                                </Text> */}
                                <Box
                                    w={'full'}
                                    h={'300px'}
                                    bgColor={'blackAlpha.100'}
                                    rounded={'xl'}
                                    boxShadow={'sm'}
                                    border={'1px solid #50505028'}
                                    p={10}
                                    mt={4}
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
                            </TourFormWrapper>
                        </Box>
                    </Fade>
                </Box>
                <Box>
                    <div className="py-2 flex items-start justify-between w-full">
                        <div>
                            <Text mb={1} fontSize={'16px'} fontWeight={400}>
                                Thời gian trải nghiệm
                            </Text>
                            <Text mb={1} fontSize={'14px'} color={'gray.600'}>
                                1 đêm.
                            </Text>
                        </div>
                        <div className="flex flex-col items-end">
                            <Button
                                size={'sm'}
                                variant={'ghost'}
                                textDecoration={'underline'}
                                color={'black'}
                                rounded={'lg'}
                                onClick={Disclosure1.onToggle}
                            >
                                {!Disclosure1.isOpen ? 'Chỉnh sửa' : 'Thu gọn'}
                            </Button>
                        </div>
                    </div>
                    <Fade in={Disclosure1.isOpen}>
                        <Box display={Disclosure1.isOpen ? 'block' : 'none'}>
                            <TourFormWrapper>
                                <Text
                                    fontSize={'16px'}
                                    fontWeight={'600'}
                                    width={'full'}
                                    // noOfLines={2}
                                    letterSpacing={'tight'}
                                >
                                    Chọn thời gian trải nghiệm
                                </Text>

                                <Select
                                    mt={4}
                                    size="lg"
                                    rounded={'lg'}
                                    focusBorderColor={'teal.500'}
                                    onChange={handleSelectChange}
                                    defaultValue={lisTimeSlot[3]}
                                    w={'40%'}
                                >
                                    {lisTimeSlot.map((rs) => (
                                        <option
                                            value={rs}
                                            // selected={tour.timeSlotLength === rs}
                                        >
                                            {numberToTime(rs)}
                                        </option>
                                    ))}
                                </Select>
                            </TourFormWrapper>
                        </Box>
                    </Fade>
                </Box>
                <Box>
                    <div className="py-2 flex items-start justify-between w-full">
                        <div>
                            <Text mb={1} fontSize={'16px'} fontWeight={400}>
                                Khung giờ khả dụng
                            </Text>
                            <Text mb={1} fontSize={'14px'} color={'gray.600'}>
                                13:00 - 14:00
                            </Text>
                        </div>
                        <div className="flex flex-col items-end">
                            <Button
                                size={'sm'}
                                variant={'ghost'}
                                textDecoration={'underline'}
                                color={'black'}
                                rounded={'lg'}
                                onClick={Disclosure2.onToggle}
                            >
                                {!Disclosure2.isOpen ? 'Chỉnh sửa' : 'Thu gọn'}
                            </Button>
                        </div>
                    </div>
                    <Fade in={Disclosure2.isOpen}>
                        <Box display={Disclosure2.isOpen ? 'block' : 'none'}>
                            <TourFormWrapper>
                                <Text
                                pb={4}
                                    fontSize={'16px'}
                                    fontWeight={'600'}
                                    width={'full'}
                                    // noOfLines={2}
                                    letterSpacing={'tight'}
                                >
                                    Thời gian trải nghiệm bắt đầu
                                </Text>

                                <Select w={'50%'} size="lg" rounded={'lg'} focusBorderColor={'teal.500'} onChange={handleSelectChange1}>
                                    <option value={0}>--Chọn giờ bắt đầu--</option>

                                    {timeListStart.map((rs) => (
                                        <option
                                            value={timeToMinute(rs)}
                                            // selected={timeToMinute(rs) === timeToMinute(tour.timeBookStart)}
                                        >
                                            {rs.hour}:{rs.minutes === 0 ? '00' : rs.minutes}
                                        </option>
                                    ))}
                                </Select>
                                <Text
                                py={4}
                                    fontSize={'16px'}
                                    fontWeight={'600'}
                                    width={'full'}
                                    // noOfLines={2}
                                    letterSpacing={'tight'}
                                >
                                    Thời gian trải nghiệm kết thúc
                                </Text>
                                <Select
                                    w={'50%'}
                                    size="lg"
                                    rounded={'lg'}
                                    focusBorderColor={'teal.500'}
                                    onChange={handleSelectChange2}
                                    // isDisabled={!(tour.timeBookStart.hour !== undefined && tour.timeBookStart.minutes !== undefined)}
                                >
                                    <option value={0}>--Chọn giờ kết thúc--</option>
                                    {timeListEnd?.map((rs) => (
                                        <option
                                            value={timeToMinute(rs)}
                                            // selected={timeToMinute(rs) === timeToMinute(tour.timeBookEnd)}
                                        >
                                            {rs.hour}:{rs.minutes === 0 ? '00' : rs.minutes}
                                        </option>
                                    ))}
                                </Select>
                            </TourFormWrapper>
                        </Box>
                    </Fade>
                </Box>
            </VStack>
        </>
    );
};

export default PriceTime;
