import { memo, ReactElement, useEffect, useMemo } from 'react';
import { HeaderHosting } from '@components/layouts/common/HeaderHosting';
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Stack,
    Text,
    Radio,
    RadioGroup,
} from '@chakra-ui/react';

import { BiCheck, BiChevronDown, BiMinus, BiPlus, BiX } from 'react-icons/bi';
import CalendarBase from '@components/Hosting/Calendar/CalendarBase';
import DaySection from '@components/Hosting/Calendar/DaySection';
import Image from 'next/image';
import useGetAllHostTour from 'src/hooks/hosting/tours/useGetAllHostTour';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { RESET, selectCalendarHost, SET_TOURID, SET_VIEW } from 'src/redux/slice/calendarHostSlice';
import { ITours } from 'src/types/tours.type';
import { useRouter } from 'next/router';
const CalendarHosting = () => {
    const { status, ref, data, isSuccess, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetAllHostTour(1000);
    const dispatch = useAppDispatch();
    const { view } = useAppSelector(selectCalendarHost);
    const router = useRouter();
    const { id } = router.query;
    const tourId = Number(id);
    useEffect(() => {
        const handleRouteChange = () => {
            window.location.reload();
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    return (
        <div className="pt-[86px] flex relative   ">
            <Stack w={'full'} className="relative">
                <CalendarBase />
                <HStack spacing="12px" h={14} position="absolute" className="right-[18%] top-2">
                    <Popover placement={'bottom-start'} closeOnBlur={true}>
                        <PopoverTrigger>
                            <Button
                                borderRadius="48px"
                                rightIcon={<BiChevronDown />}
                                colorScheme="blackAlpha"
                                variant="outline"
                                color={'black'}
                            >
                                {data?.pages
                                    ?.find((page: any) => page?.data?.content?.find((rs: ITours) => rs.tourId === tourId))
                                    ?.data?.content?.find((rs: ITours) => rs.tourId === tourId)?.title || 'Chọn trải nghiệm'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent boxShadow="xl" w={'450px'}>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody mt={4} maxH={'350px'} overflowY={'scroll'}>
                                <RadioGroup
                                    value={`${tourId}`}
                                    onChange={(e) => {
                                        dispatch(SET_TOURID(Number(e)));
                                        dispatch(RESET());
                                        router.push({
                                            pathname: `/hosting/calendar/${Number(e)}`,
                                        });
                                    }}
                                >
                                    {data?.pages?.map((page: any) =>
                                        page?.data?.content?.map(
                                            (rs: ITours) =>
                                                !rs.isDeleted && (
                                                    <Flex alignItems={'center'} p={6} justifyContent="space-between">
                                                        <Flex alignItems={'center'}>
                                                            <Box mr={3} position={'relative'} w={24} h={16}>
                                                                <Image
                                                                    src={rs.imageMain}
                                                                    alt={`Picture of `}
                                                                    layout="fill"
                                                                    objectFit="cover"
                                                                    placeholder="blur"
                                                                    blurDataURL={rs.imageMain}
                                                                    className={'rounded-[4px]'}
                                                                />
                                                            </Box>
                                                            <Text maxW={`60%`} fontSize={'16px'} fontWeight={600} noOfLines={2} as={'p'}>
                                                                {rs.title}
                                                            </Text>
                                                        </Flex>
                                                        <Radio size="lg" name="1" colorScheme="teal" value={`${rs.tourId}`} />
                                                    </Flex>
                                                ),
                                        ),
                                    )}
                                </RadioGroup>

                                {/* <div ref={ref}></div> */}
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Popover placement={'bottom-end'} closeOnBlur={true}>
                        <PopoverTrigger>
                            <Button
                                borderRadius="48px"
                                rightIcon={<BiChevronDown />}
                                colorScheme="blackAlpha"
                                variant="outline"
                                color={'black'}
                            >
                                {view === 'month' ? 'Chế độ xem theo tháng' : 'Chế độ xem theo năm'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent boxShadow="xl" w={'350px'}>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody mt={6} maxH={'350px'} overflowY={'scroll'}>
                                <RadioGroup
                                    value={view}
                                    onChange={(e) => {
                                        dispatch(SET_VIEW(e));
                                    }}
                                >
                                    <Flex alignItems={'center'} p={4} justifyContent="space-between">
                                        <Text maxW={`90%`} fontSize={'16px'} fontWeight={600} noOfLines={2} as={'p'}>
                                            Chế độ xem theo tháng
                                        </Text>

                                        <Radio size="lg" name="1" colorScheme="teal" value={'month'} />
                                    </Flex>
                                    <Flex alignItems={'center'} p={4} justifyContent="space-between">
                                        <Text maxW={`90%`} fontSize={'16px'} fontWeight={600} noOfLines={2} as={'p'}>
                                            Chế độ xem theo năm
                                        </Text>

                                        <Radio size="lg" name="1" colorScheme="teal" value={'year'} />
                                    </Flex>
                                </RadioGroup>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </HStack>
            </Stack>
            <Stack w={'430px'} float={'right'} className="border-l border-l-gray-700  ">
                <DaySection />
            </Stack>
        </div>
    );
};

// CalendarHosting.requireAuth = true;
export default CalendarHosting;

CalendarHosting.getLayout = function (page: ReactElement) {
    return (
        <>
            <HeaderHosting />
            {page}
        </>
    );
};
