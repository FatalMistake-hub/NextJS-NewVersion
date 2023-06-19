import { VStack, Flex, Heading, Box } from '@chakra-ui/react';
import { HeaderHosting } from '@components/layouts/common/HeaderHosting';
import { ReactElement } from 'react';
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import useOrderStatistic from 'src/hooks/hosting/statistic/useStaticOrder';
const Performance = () => {
    const { data, isLoading, isError, isSuccess } = useOrderStatistic();

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Thống kê đơn hàng',
            
            },
        },
    };
    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    // console.log(labels.map(() => faker.datatype.number({ min: 0, max: 1000 })));
    // const data = {
    //     labels,
    //     datasets: [
    //         {
    //             label: 'Dataset 1',
    //             data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //         },
    //     ],
    // };
    return (
        <div className="min-h-screen flex flex-col items-center pt-20">
            <VStack width={'1280px'} float={'left'} alignItems={'flex-start'} py={16}>
                <Flex justifyContent={'space-between'} w={'full'} mb={4}>
                    <Heading lineHeight={1.4} as="h2" fontSize={'28px'} fontWeight={'600'} noOfLines={2}>
                        Thống kê đơn hàng
                    </Heading>
                </Flex>
                <Box mt={2} pb={4} w={'full'}>
                    <Bar
                        options={options}
                        data={{
                            labels: data?.map((item) => item.label),
                            datasets: [
                                {
                                    label: 'Số đơn hàng',
                                    data: data?.map((item) => item.totalOrder),

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
