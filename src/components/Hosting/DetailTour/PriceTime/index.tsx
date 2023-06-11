import {
    VStack,
    StackDivider,
    Button,
    Text,
    useDisclosure,
    Fade,
    Box,
    HStack,
    Input,
    useNumberInput,
    Select,
} from '@chakra-ui/react';
import TourFormWrapper from '@components/Wrapper/TourFormWrapper';
import { useEffect, ChangeEvent, useState, useMemo } from 'react';
import { ITours } from 'src/types/tours.type';
import { listTimeSlot, numberToTime, TimeFrameListStart, timeToMinute, TimeFrameListEnd, minuteToTime } from 'src/utils/dateUntils';
type Props = {
    value: Partial<ITours>;
    tourId?: string;
};
const PriceTime = ({ tourId, value: valueTour }: Props) => {
    const [priceOnePerson, setPriceOnePerson] = useState<any>(valueTour.priceOnePerson);
    const [timeSlotLength, setTimeSlotLength] = useState<number | undefined>(valueTour.timeSlotLength);
    const [timeBookStart, setTimeBookStart] = useState(valueTour.timeBookStart);
    const [timeBookEnd, setTimeBookEnd] = useState(valueTour.timeBookEnd);

    const { isOpen, onToggle } = useDisclosure();
    const Disclosure1 = useDisclosure();
    const Disclosure2 = useDisclosure();
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, value } = useNumberInput({
        step: 10000,
        defaultValue: priceOnePerson,
        min: 10000,
        max: 1000000000,
        precision: 0,
    });
    useEffect(() => {
        if (Number(value) < 100000000) setPriceOnePerson(Number(value));
        return () => {};
    }, [value]);

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setTimeSlotLength(Number(event.target.value));
    };
    const handleSelectChange2 = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value !== '0') {
            setTimeBookStart(minuteToTime(event.target.value));
        }
    };
    const handleSelectChange1 = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value !== '0') {
            setTimeBookEnd(minuteToTime(event.target.value));
        }
    };
    const lisTimeSlot = listTimeSlot();
    const formattedValue = `${value.toLocaleString()}₫`;

    const timeListStart = TimeFrameListStart(timeSlotLength);
    let timeListEnd = [
        {
            hour: 0,
            minutes: 0,
        },
    ];

    if (timeBookStart?.hour !== undefined && timeBookStart?.minutes !== undefined) {
        timeListEnd = TimeFrameListEnd(timeToMinute(timeBookStart), timeSlotLength);
    }
    const timeStatus = useMemo(() => {
        if (timeSlotLength) {
            if (timeToMinute(timeBookEnd) - timeToMinute(timeBookStart) < timeSlotLength) return false;
            return true;
        }
    }, [timeBookStart, timeBookEnd, timeSlotLength]);
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
                                ₫{valueTour.priceOnePerson?.toLocaleString('vi-VN')}
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
                            <TourFormWrapper value={{ priceOnePerson: priceOnePerson }} tourId={tourId}>
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
                <TourFormWrapper
                    value={{ timeBookStart: timeBookStart, timeBookEnd: timeBookEnd, timeSlotLength: timeSlotLength }}
                    tourId={tourId}
                    type="time"
                    isActive={timeStatus}
                >
                    <Box>
                        <div className="py-2 flex items-start justify-between w-full">
                            <div>
                                <Text mb={1} fontSize={'16px'} fontWeight={400}>
                                    Thời gian trải nghiệm
                                </Text>
                                <Text mb={1} fontSize={'14px'} color={'gray.600'}>
                                    {numberToTime(valueTour.timeSlotLength)}
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
                        <Fade in={Disclosure1.isOpen} className="flex justify-center">
                            <Box
                                display={Disclosure1.isOpen ? 'block' : 'none'}
                                className=" border border-gray-800 rounded-2xl w-1/2 self-center h-full bg-white p-8 relative"
                            >
                                {/* <TourFormWrapper value={{ timeSlotLength: timeSlotLength }} tourId={tourId}> */}
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
                                    // defaultValue={lisTimeSlot[3]}
                                    w={'90%'}
                                >
                                    {lisTimeSlot.map((rs) => (
                                        <option key={rs} value={rs} selected={timeSlotLength === rs}>
                                            {numberToTime(rs)}
                                        </option>
                                    ))}
                                </Select>
                                {/* </TourFormWrapper> */}
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
                                    {valueTour.timeBookStart?.hour}:
                                    {valueTour.timeBookStart?.minutes === 0 ? '00' : valueTour.timeBookStart?.minutes} -{' '}
                                    {valueTour.timeBookEnd?.hour}:
                                    {valueTour.timeBookEnd?.minutes === 0 ? '00' : valueTour.timeBookEnd?.minutes}
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
                        <Fade in={Disclosure2.isOpen} className="flex justify-center">
                            <Box
                                display={Disclosure2.isOpen ? 'block' : 'none'}
                                className=" border border-gray-800 rounded-2xl w-1/2 self-center h-full bg-white p-8 relative"
                            >
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

                                <Select w={'90%'} size="lg" rounded={'lg'} focusBorderColor={'teal.500'} onChange={handleSelectChange2}>
                                    <option value={0}>--Chọn giờ bắt đầu--</option>

                                    {timeListStart.map((rs, index) => (
                                        <option
                                            key={index}
                                            value={timeToMinute(rs)}
                                            selected={timeToMinute(rs) === timeToMinute(timeBookStart)}
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
                                    w={'90%'}
                                    size="lg"
                                    rounded={'lg'}
                                    focusBorderColor={'teal.500'}
                                    onChange={handleSelectChange1}
                                    isDisabled={!(timeBookStart?.hour !== undefined && timeBookStart?.minutes !== undefined)}
                                >
                                    <option value={0}>--Chọn giờ kết thúc--</option>
                                    {timeListEnd?.map((rs, index) => (
                                        <option
                                            key={index}
                                            value={timeToMinute(rs)}
                                            selected={timeToMinute(rs) === timeToMinute(timeBookEnd)}
                                        >
                                            {rs.hour}:{rs.minutes === 0 ? '00' : rs.minutes}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                        </Fade>
                    </Box>
                </TourFormWrapper>
            </VStack>
        </>
    );
};

export default PriceTime;
