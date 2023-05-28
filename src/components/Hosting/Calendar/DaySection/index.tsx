import {
    VStack,
    StackDivider,
    Box,
    Heading,
    Flex,
    Stack,
    IconButton,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    SimpleGrid,
    Checkbox,
    Button,
    Text,
} from '@chakra-ui/react';
import { BiX, BiCheck, BiMinus, BiPlus } from 'react-icons/bi';
import { useEffect, useState, useMemo, memo } from 'react';
import { DateTimeToString } from 'src/utils/dateUntils';
import { IDayBookResponse } from 'src/types/timeBooking.type';
import useGetAllTimeBookingByRange from 'src/hooks/guest/timeBooking/useGetAllTimeBookingByRange';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectCalendarHost } from 'src/redux/slice/calendarHostSlice';
import { useRouter } from 'next/router';

const DaySection = () => {
    const [postValue, setPostValue] = useState<any>();
    const dispatch = useAppDispatch();
    const { dateRange } = useAppSelector(selectCalendarHost);
    const router = useRouter();
    const { id } = router.query;
    // const [res, setRes] = useState<IDayBookResponse>();
    const tourId = useMemo(() => id, [id]);
    
    const { data } = useGetAllTimeBookingByRange(dateRange.startDate, dateRange.endDate, 1000, tourId);
    const res = data?.pages[0].data;

    console.log(res);
    console.log('rểnder', id);
    const handleStatusDay = (status: boolean, id: string) => {
        const newTime = res?.content.map((date: any) => {
            if (date.dayBookId === id) {
                return {
                    ...date,
                    is_deleted: status,
                };
            }
            return date;
        });
        setPostValue({ content: newTime });
        console.log({ content: newTime });
    };
    const handleChecked = (isActive: boolean, id: string, dayBookId: string) => {
        console.log(isActive, !isActive);
        const newTime = res?.content.map((date: any) => {
            if (date.dayBookId === dayBookId) {
                const updatedTimeBookViewDtoList = date.timeBookViewDtoList.map((time: any) => {
                    if (time.timeId === id) {
                        return {
                            ...time,
                            is_deleted: !isActive,
                        };
                    }
                    return time;
                });
                return {
                    ...date,
                    timeBookViewDtoList: updatedTimeBookViewDtoList,
                };
            }
            return date;
        });
        setPostValue({ content: newTime });
    };
    return (
        <VStack
            divider={<StackDivider borderColor="black.200" />}
            py={6}
            align="stretch"
            width={'full'}
            overflowY={'scroll'}
            maxH={'calc(100vh - 89px)'}
        >
            <Box p={6}>
                <Heading lineHeight={1.4} as="h2" fontSize={'26px'} fontWeight={'600'} width={'full'} noOfLines={2} pb={12}>
                    {dateRange.startDate === dateRange.endDate
                        ? 'Ngày ' + dateRange.startDate.slice(-2) + ' tháng ' + dateRange.endDate.slice(5, 7)
                        : 'Ngày ' +
                          dateRange.startDate.slice(-2) +
                          ' - Ngày ' +
                          dateRange.endDate.slice(-2) +
                          ' tháng ' +
                          dateRange.endDate.slice(5, 7)}
                    {/* Ngày 22 - Ngày 30 tháng 6 */}
                </Heading>
                <Flex justifyContent={'space-between'}>
                    <Text fontSize={'18px'} fontWeight={600}>
                        Còn trống
                    </Text>
                    <Stack spacing={4} direction="row" align="center">
                        <IconButton
                            rounded={'full'}
                            fontSize="20px"
                            aria-label="x"
                            textColor={'white'}
                            colorScheme={'blackAlpha'}
                            backgroundColor={'black'}
                            size="sm"
                            icon={<BiX />}
                        />

                        <IconButton
                            rounded={'full'}
                            fontSize="20px"
                            aria-label="v"
                            variant={'outline'}
                            color={'black'}
                            size="sm"
                            icon={<BiCheck />}
                        />
                    </Stack>
                </Flex>
            </Box>
            <Box py={6}>
                <Heading lineHeight={1.4} as="h3" fontSize={'18px'} fontWeight={'600'} width={'full'} noOfLines={2} px={6} pb={4}>
                    Ngày và các khung thời gian
                </Heading>
                <Flex justifyContent={'space-between'}>
                    <Accordion allowToggle w={'full'}>
                        {res?.content?.map((date: any) => (
                            <AccordionItem px={2} border={'0px'}>
                                {({ isExpanded }: any) => (
                                    <>
                                        <AccordionButton>
                                            {/* <AccordionIcon /> */}
                                            {isExpanded ? <BiMinus fontSize="12px" /> : <BiPlus fontSize="12px" />}

                                            <Text fontSize={'18px'} fontWeight={600} as="span" flex="1" textAlign="left" pl={4}>
                                                {DateTimeToString(date.date_name)}
                                            </Text>
                                            <Stack spacing={4} direction="row" align="center">
                                                <IconButton
                                                    rounded={'full'}
                                                    fontSize="20px"
                                                    aria-label="x"
                                                    variant={!date.is_deleted ? 'outline' : ''}
                                                    colorScheme={!date.is_deleted ? 'blackAlpha' : ''}
                                                    textColor={!date.is_deleted ? 'black' : 'white'}
                                                    backgroundColor={!date.is_deleted ? 'white' : 'black'}
                                                    size="sm"
                                                    icon={<BiX />}
                                                    // isDisabled={!date.is_deleted}
                                                    onClick={() => {
                                                        if (date.is_deleted === false) {
                                                            handleStatusDay(true, date.dayBookId);
                                                        }
                                                    }}
                                                />

                                                <IconButton
                                                    rounded={'full'}
                                                    fontSize="20px"
                                                    aria-label="v"
                                                    variant={date.is_deleted ? 'outline' : ''}
                                                    colorScheme={date.is_deleted ? 'blackAlpha' : ''}
                                                    textColor={date.is_deleted ? 'black' : 'white'}
                                                    backgroundColor={date.is_deleted ? 'white' : 'black'}
                                                    size="sm"
                                                    icon={<BiCheck />}
                                                    // isDisabled={date.is_deleted}
                                                    onClick={() => {
                                                        if (date.is_deleted === true) {
                                                            handleStatusDay(false, date.dayBookId);
                                                        }
                                                    }}
                                                />
                                            </Stack>
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            <SimpleGrid columns={2} spacing={4} p={2}>
                                                {date.timeBookViewDtoList.map((time: any) => (
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        size={'md'}
                                                        key={time.timeId}
                                                        isChecked={!time.is_deleted}
                                                        value={time.is_deleted}
                                                        onChange={(e) => handleChecked(time.is_deleted, time.timeId, date.dayBookId)}
                                                    >
                                                        {time.start_time.substring(0, 5)} - {time.end_time.substring(0, 5)}
                                                    </Checkbox>
                                                ))}
                                            </SimpleGrid>
                                            <Flex justifyContent={'flex-end'} p={'2'}>
                                                <Button
                                                    colorScheme={'teal'}
                                                    onClick={() =>
                                                        console.log(res.content.find((res: any) => res.dayBookId === date.dayBookId))
                                                    }
                                                >
                                                    Lưu
                                                </Button>
                                            </Flex>
                                        </AccordionPanel>
                                    </>
                                )}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Flex>
            </Box>
        </VStack>
    );
};

export default memo(DaySection);
