import { Button, VStack, Text, Box, Flex, Avatar } from '@chakra-ui/react';

const CardReservation = () => {
    return (
        <div className="group flex flex-col min-h-40 bg-white border border-gray-200 shadow-sm rounded-xl  ">
            <div className="p-4 ">
                <VStack float={'left'} alignItems={'flex-start'} gap={2}>
                    <Box>
                        <Text fontSize={'16px'} fontWeight={600} noOfLines={1} as={'p'} color={'teal'} textAlign={'left'}>
                            Đang đón tiếp
                        </Text>
                        <Text fontSize={'12px'} fontWeight={300} noOfLines={1} textAlign={'left'}>
                            Chuyến đi nửa ngày Khám phá Địa đạo Củ Chi
                        </Text>
                    </Box>
                    <Flex justifyContent={'space-between'} w={'full'}>
                        <Box>
                            <Text fontSize={'16px'} fontWeight={500} noOfLines={1} as={'p'} textAlign={'left'}>
                                NguyenTriAn
                            </Text>
                            <Text fontSize={'12px'} fontWeight={500} noOfLines={1} as={'p'} textAlign={'left'}>
                                26 Dec 2022, 08:30 - 09:30
                            </Text>
                        </Box>
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" size={'md'}  />
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
                Message
            </Button>
        </div>
    );
};

export default CardReservation;
