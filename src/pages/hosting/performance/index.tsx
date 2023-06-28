import {
    VStack,
    Flex,
    Heading,
    Box,
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverTrigger,
    Select,
} from '@chakra-ui/react';
import { HeaderHosting } from '@components/layouts/common/HeaderHosting';
import { ReactElement, useEffect, useState } from 'react';
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useOrderStatistic from 'src/hooks/hosting/statistic/useStaticOrder';
import { BiChevronDown, BiRightArrowAlt } from 'react-icons/bi';
import vi from 'date-fns/locale/vi';
import { subDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import useStaticByRange from 'src/hooks/hosting/statistic/useStaticByRange';
import { IStatisticOrder } from 'src/types/statistic.type';
import moment from 'moment';
const Performance = () => {
    // const { data, isLoading, isError, isSuccess } = useOrderStatistic();
    const [data, setData] = useState<{ statisticResponse: IStatisticOrder[] }>({ statisticResponse: [] });
    const [type, setType] = useState<'ORDER' | 'VENUE'>('ORDER');
    const { getByRange } = useStaticByRange(setData);
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: `${type === 'ORDER' ? 'Thống kê đơn đặt' : 'Thống kê doanh thu'}`,
            },
        },
    };
    const [state, setState] = useState<any>([
        {
            startDate: subDays(new Date(), 7),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    useEffect(() => {
        getByRange({
            start: moment(state[0].startDate).format('YYYY-MM-DD'),
            end: moment(state[0].endDate).format('YYYY-MM-DD'),
            type: type,
        });
        console.log(data, type);
    }, [state, type]);
    return (
        <div className="min-h-screen flex flex-col items-center pt-20">
            <VStack width={'1280px'} float={'left'} alignItems={'flex-start'} py={16}>
                <Flex w={'full'} alignItems={'center'} mb={4}>
                    <Select
                        // size={'lg'}
                        w={'fit'}
                        variant="outline"
                        color={'black'}
                        focusBorderColor={'teal.500'}
                        borderColor={'black'}
                        rounded={'48px'}
                        value={type}
                        mr={6}
                        fontWeight={500}
                        fontSize={'18px'}
                        onChange={(e: any) => {
                            setType(e.target.value);
                        }}
                    >
                        <option value="ORDER">Thống kê đơn đặt</option>
                        <option value="VENUE">Thống kê doanh thu</option>
                    </Select>

                    <Popover placement={'bottom-start'} closeOnBlur={true}>
                        <PopoverTrigger>
                            <Button
                                borderRadius="48px"
                                rightIcon={<BiChevronDown />}
                                colorScheme="blackAlpha"
                                variant="outline"
                                color={'black'}
                            >
                                {moment(state[0].startDate).format('Do MM YYYY')}
                                <BiRightArrowAlt className="inline-block mx-2" />
                                {moment(state[0].endDate).format('Do MM YYYY')}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent boxShadow="xl" w={'640px'} display={'flex'} justifyContent={'center'}>
                            <PopoverArrow />
                            <PopoverBody mt={6} maxH={'500px'} overflowY={'scroll'}>
                                <DateRangePicker
                                    onChange={(item) => setState([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={state}
                                    direction="horizontal"
                                    months={1}
                                    editableDateInputs={true}
                                    rangeColors={['#F7F7F7']}
                                    showDateDisplay={false}
                                    maxDate={new Date()}
                                    monthDisplayFormat="MMMM YYY"
                                    locale={vi}
                                    className="flex justify-center max-w-[600px]"
                                />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Flex>
                <Box mt={2} pb={4} w={'full'}>
                    <Bar
                        options={options}
                        data={{
                            labels: data?.statisticResponse.map((item) => moment(item.label).format('DD')),
                            datasets: [
                                {
                                    label: `${type === 'ORDER' ? 'Số đơn đặt' : 'Doanh thu'}`,
                                    data: data?.statisticResponse.map((item) => item.value),

                                    backgroundColor: 'rgba(62, 170, 165, 0.596)',
                                },
                            ],
                        }}
                    />
                </Box>
            </VStack>
        </div>
    );
};

export default Performance;
Performance.requireAuth = true;
Performance.getLayout = function (page: ReactElement) {
    return (
        <>
            <HeaderHosting />
            {page}
        </>
    );
};
