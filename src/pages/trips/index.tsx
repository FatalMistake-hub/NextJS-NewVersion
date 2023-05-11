import { Box, StackDivider, VStack, Heading, Text, Button } from '@chakra-ui/react';

const Trips = () => {
    return (
        <div className="flex justify-center w-full">
            <VStack divider={<StackDivider borderColor="black.200" />} align="stretch" width={'1440px'}>
                <Box pt={9} pb={6}>
                    <Heading as="h1" fontSize={'32px'} fontWeight={'600'} width={'full'} noOfLines={1}>
                        Chuyến đi
                    </Heading>
                </Box>
                <Box pt={8} pb={12}>
                    <Text fontSize={'22px'} fontWeight={'600'} width={'full'}>
                        Chưa có chuyến đi nào được đặt... vẫn chưa!
                    </Text>
                    <Text fontSize={'16px'} fontWeight={'400'} width={'full'} mt={1}>
                        Đã đến lúc phủi bụi hành lý và bắt đầu chuẩn bị cho chuyến phiêu lưu tiếp theo của bạn rồi
                    </Text>
                    <Button borderWidth={'1px'} borderColor={'black'} variant={'outline'} size={'lg'} color={'black'} mt={4}>
                        Bắt đầu tìm kiếm
                    </Button>
                </Box>
                <Box pt={6} pb={9}>
                    <Text fontSize={'14px'} fontWeight={'400'} width={'full'} mt={1}>
                        Bạn không tìm thấy đặt phòng/đặt chỗ của mình ở đây?Truy cập Trung tâm trợ giúp
                    </Text>
                </Box>
            </VStack>
        </div>
    );
};
Trips.requireAuth = true;
export default Trips;
Trips.Layout = 'NoSearchLayout';
