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
    SkeletonText,
} from '@chakra-ui/react';
import { BiX, BiCheck, BiMinus, BiPlus } from 'react-icons/bi';
import { useEffect, useState, useMemo, memo } from 'react';
import { DateTimeToString } from 'src/utils/dateUntils';
import { IDayBook, IDayBookResponse, TimeBookViewDtoList } from 'src/types/timeBooking.type';
import useGetAllTimeBookingByRange from 'src/hooks/guest/timeBooking/useGetAllTimeBookingByRange';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectCalendarHost } from 'src/redux/slice/calendarHostSlice';
import { useRouter } from 'next/router';
import usePatchDayTimeBook from 'src/hooks/guest/timeBooking/usePatchDayTimeBook';
import { set } from 'immer/dist/internal';

const DaySection = () => {
    const dispatch = useAppDispatch();
    const { dateRange } = useAppSelector(selectCalendarHost);
    const router = useRouter();
    const { id } = router.query;
    const [resValue, setResValue] = useState<IDayBookResponse>();
    const { ref, refetch, isFetching } = useGetAllTimeBookingByRange(dateRange.startDate, dateRange.endDate, 1000, id, setResValue);
    const { isLoading, isError, isSuccess, mutateDayTime } = usePatchDayTimeBook(Number(id), refetch);
    const handleStatusDay = (status: boolean, id: string) => {
        const newTime = resValue?.content.find((date: IDayBook) => {
            if (date.dayBookId === id) {
                return {
                    ...date,
                };
            }
        });
        if (newTime) {
            newTime.isDeleted = status;
            mutateDayTime([newTime]);
        }
    };
    const handleListStatusDay = (status: boolean) => {
        const newTime = resValue?.content.map((date: IDayBook) => {
            return {
                ...date,
                isDeleted: status,
            };
        });
        if (newTime) {
            mutateDayTime(newTime);
        }
    };
    const [statusList, setStatusList] = useState<boolean>(false);
    useEffect(() => {
        const status = resValue?.content.some((date: IDayBook) => {
            return date.isDeleted === true;
        });
        if (isSuccess && status !== undefined) setStatusList(status);
    });
    const handleChecked = (isActive: boolean, id: string, dayBookId: string) => {
        const newTime = resValue?.content.map((date: IDayBook) => {
            if (date.dayBookId === dayBookId) {
                const updatedTimeBookViewDtoList = date.timeBookDetailList.map((time: TimeBookViewDtoList) => {
                    if (time.timeId === id) {
                        return {
                            ...time,
                            isDeleted: !isActive,
                        };
                    }
                    return time;
                });
                return {
                    ...date,
                    timeBookDetailList: updatedTimeBookViewDtoList,
                };
            }
            return date;
        });
        if (newTime) setResValue({ content: newTime });
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
                            variant={!statusList ? 'outline' : ''}
                            colorScheme={!statusList ? 'blackAlpha' : ''}
                            textColor={!statusList ? 'black' : 'white'}
                            backgroundColor={!statusList ? 'white' : 'black'}
                            isLoading={isFetching ||isLoading}
                            size="sm"
                            icon={<BiX />}
                            onClick={() => handleListStatusDay(true)}
                        />

                        <IconButton
                            rounded={'full'}
                            fontSize="20px"
                            aria-label="v"
                            variant={statusList ? 'outline' : ''}
                            colorScheme={statusList ? 'blackAlpha' : ''}
                            textColor={statusList ? 'black' : 'white'}
                            backgroundColor={statusList ? 'white' : 'black'}
                            size="sm"
                            isLoading={isFetching ||isLoading}
                            icon={<BiCheck />}
                            onClick={() => handleListStatusDay(false)}
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
                        {isFetching ||isLoading ? (
                            <Stack w={'full'} float={'right'} className="relative justify-start flex items-center ">
                                <SkeletonText w={'full'} mt={2} px={6} noOfLines={10} spacing="4" skeletonHeight="8" />
                            </Stack>
                        ) : (
                            resValue?.content
                                ?.sort((a: any, b: any) => a.date_name.localeCompare(b.date_name))
                                .map((date: IDayBook) => (
                                    <AccordionItem key={date.dayBookId} px={2} border={'0px'}>
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
                                                            variant={!date.isDeleted ? 'outline' : ''}
                                                            colorScheme={!date.isDeleted ? 'blackAlpha' : ''}
                                                            textColor={!date.isDeleted ? 'black' : 'white'}
                                                            backgroundColor={!date.isDeleted ? 'white' : 'black'}
                                                            size="sm"
                                                            icon={<BiX />}
                                                            // isDisabled={!date.isDeleted}
                                                            onClick={() => {
                                                                if (date.isDeleted === false) {
                                                                    handleStatusDay(true, date.dayBookId);
                                                                }
                                                            }}
                                                        />

                                                        <IconButton
                                                            rounded={'full'}
                                                            fontSize="20px"
                                                            aria-label="v"
                                                            variant={date.isDeleted ? 'outline' : ''}
                                                            colorScheme={date.isDeleted ? 'blackAlpha' : ''}
                                                            textColor={date.isDeleted ? 'black' : 'white'}
                                                            backgroundColor={date.isDeleted ? 'white' : 'black'}
                                                            size="sm"
                                                            icon={<BiCheck />}
                                                            // isDisabled={date.isDeleted}
                                                            onClick={() => {
                                                                if (date.isDeleted === true) {
                                                                    handleStatusDay(false, date.dayBookId);
                                                                }
                                                            }}
                                                        />
                                                    </Stack>
                                                </AccordionButton>
                                                <AccordionPanel pb={4}>
                                                    <SimpleGrid columns={2} spacing={4} p={2}>
                                                        {date.timeBookDetailList.map((time: TimeBookViewDtoList) => (
                                                            <Checkbox
                                                                fontSize={'14px'}
                                                                fontWeight={600}
                                                                colorScheme="teal"
                                                                size={'md'}
                                                                key={time.timeId}
                                                                isChecked={!time.isDeleted}
                                                                value={`${time.isDeleted}`}
                                                                onChange={(e) => handleChecked(time.isDeleted, time.timeId, date.dayBookId)}
                                                            >
                                                                {time.start_time.substring(0, 5)} - {time.end_time.substring(0, 5)}
                                                            </Checkbox>
                                                        ))}
                                                    </SimpleGrid>
                                                    <Flex justifyContent={'flex-end'} p={'2'}>
                                                        <Button
                                                            colorScheme={'teal'}
                                                            onClick={() => {
                                                                const value = resValue.content.find(
                                                                    (res: any) => res.dayBookId === date.dayBookId,
                                                                );
                                                                if (value) {
                                                                    mutateDayTime([value]);
                                                                }
                                                            }}
                                                        >
                                                            Lưu
                                                        </Button>
                                                    </Flex>
                                                </AccordionPanel>
                                            </>
                                        )}
                                    </AccordionItem>
                                ))
                        )}
                    </Accordion>
                </Flex>
            </Box>
        </VStack>
    );
};

export default memo(DaySection);
