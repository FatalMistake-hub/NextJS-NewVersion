import { Button, VStack, Text, Box, Flex, Avatar } from '@chakra-ui/react';
import moment from 'moment';
import { IOrder } from 'src/types/order.type';
import { handleNameStatus } from 'src/utils/hostUtil';

type Props = {
    data?: IOrder;
};
const CardReservation = ({ data }: Props) => {
    return (
        <div className="group max-w-[400px] flex flex-col min-h-40  bg-white border border-gray-200 shadow-sm rounded-xl  ">
            <div className="p-4 ">
                <VStack float={'left'} alignItems={'flex-start'} w={'full'} gap={2}>
                    <Box>
                        <Text fontSize={'16px'} fontWeight={600} noOfLines={1} as={'p'} color={'teal'} textAlign={'left'}>
                            {data?.statusOrder && handleNameStatus(data.statusOrder)}
                        </Text>
                        <Text fontSize={'12px'} fontWeight={300} noOfLines={1} textAlign={'left'}>
                            {data?.tour_title}
                        </Text>
                    </Box>
                    <Flex justifyContent={'space-between'} w={'full'}>
                        <Box>
                            <Text fontSize={'16px'} fontWeight={500} noOfLines={1} as={'p'} textAlign={'left'}>
                                {data?.user?.userName}
                            </Text>
                            <Text fontSize={'12px'} fontWeight={500} noOfLines={1} as={'p'} textAlign={'left'}>
                                {moment(data?.date_name).format('dddd, DD MMMM')} {data?.timeBookViewDto?.start_time} -{' '}
                                {data?.timeBookViewDto?.end_time}
                            </Text>
                        </Box>
                        <Avatar name={data?.user?.userName} src={data?.user?.urlImage || 'https://bit.ly/broken-link'} size={'md'} />
                    </Flex>
                </VStack>
            </div>

            <Button
                variant={'ghost'}
                colorScheme={'blackAlpha'}
                className="mt-auto flex border-t border-gray-200 justify-center py-2"
                color={'black'}
            >
                {' '}
                Nhắn tin
            </Button>
        </div>
    );
};

export default CardReservation;
