import { Box, StackDivider, VStack, Heading, Text, Button, SimpleGrid, Select } from '@chakra-ui/react';
import CardTrip from '@components/Card/CardTrip';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

import useGetAllGuestOrder from 'src/hooks/hosting/order/useGetAllGuestOrder';

const Trips = () => {
    const { data, isLoading, isError, isSuccess } = useGetAllGuestOrder();
    const [selectedStatus, setSelectedStatus] = useState('');

    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value);
    };

    return (
        <div className="flex justify-center w-full">
            <VStack divider={<StackDivider borderColor="black.200" />} align="stretch" width={'1440px'}>
                <Box pt={9} pb={6}>
                    <Heading lineHeight={1.4} as="h1" fontSize={'32px'} fontWeight={'700'} width={'full'} noOfLines={1}>
                        Chuyến đi
                    </Heading>
                    <div className="flex justify-start w-full items-center py-4">
                        <Text fontSize={'24px'} fontWeight={'600'} width={'fit'} py={4} mr={12}>
                            Các chuyến đi sắp tới
                        </Text>
                        <Select
                            size={'lg'}
                            w={'60'}
                            colorScheme="teal"
                            focusBorderColor={'teal.500'}
                            rounded={'xl'}
                            value={selectedStatus}
                            onChange={handleStatusChange}
                        >
                            <option value="">Tất cả</option>
                            <option value="SUCCESS">Đã xác nhận</option>
                            <option value="CANCEL">Đã huỷ</option>
                            <option value="WAITING">Chờ xác nhận</option>
                            <option value="USED">Đã sử dụng</option>
                        </Select>
                    </div>
                    <SimpleGrid minChildWidth={'600px'} gap={16}>
                        {data
                            ?.filter((order) => !selectedStatus || order.statusOrder === selectedStatus)
                            .map((item, index) => (
                                <CardTrip key={item.orderId} data={item} />
                            ))}
                    </SimpleGrid>
                </Box>
                {data?.length === 0 && (
                    <Box pt={8} pb={12}>
                        <Text fontSize={'22px'} fontWeight={'600'} width={'full'}>
                            Chưa có chuyến đi nào được đặt... vẫn chưa!
                        </Text>
                        <Text fontSize={'16px'} fontWeight={'400'} width={'full'} mt={1}>
                            Đã đến lúc phủi bụi hành lý và bắt đầu chuẩn bị cho chuyến phiêu lưu tiếp theo của bạn rồi
                        </Text>
                        <Link href={'/'}>
                            <Button borderWidth={'1px'} borderColor={'black'} variant={'outline'} size={'lg'} color={'black'} mt={4}>
                                Bắt đầu tìm kiếm
                            </Button>
                        </Link>
                    </Box>
                )}

                <Box pt={6} pb={9}>
                    {/* <Text fontSize={'14px'} fontWeight={'400'} width={'full'} mt={1}>
                        Bạn không tìm thấy đặt phòng/đặt chỗ của mình ở đây?Truy cập Trung tâm trợ giúp
                    </Text> */}
                </Box>
            </VStack>
        </div>
    );
};
Trips.requireAuth = true;
export default Trips;
Trips.Layout = 'NoSearchLayout';
