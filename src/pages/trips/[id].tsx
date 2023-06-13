import { Box, Flex, Heading, HStack, Stack, StackDivider, Text, VStack } from '@chakra-ui/react';
import { HeaderNoSearch } from '@components/layouts/common/HeaderNoSearch';
import MapBase from '@components/Map/MapBase';
import MapTrip from '@components/Map/MapTrip';
import Image from 'next/image';
import { ReactElement } from 'react';

const TripDetail = () => {
    return (
        <Box className="min-h-screen w-full flex pt-[76px]" backgroundColor={'gray.50'}>
            <Stack
                position="relative"
                spacing={0}
                w={800}
                overflowY="auto"
                overflowX="hidden"
                px={8}
                py={8}
                className="flex items-center  flex-col"
                gap={4}
            >
                <Box w={'full'} boxShadow={'base'} borderRadius={'md'} backgroundColor={'white'}>
                    <Box w="full" minHeight="350px" maxHeight={'350px'} position="relative">
                        <Image
                            src={
                                'https://a0.muscache.com/im/pictures/lombard/MtTemplate-1012393-media_library/original/febf3f05-2af1-4741-ae15-6588494ccfe0.jpg?im_w=1440'
                            }
                            alt={`Picture of `}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={
                                'https://a0.muscache.com/im/pictures/lombard/MtTemplate-1012393-media_library/original/febf3f05-2af1-4741-ae15-6588494ccfe0.jpg?im_w=1440'
                            }
                            className=" rounded-t-md"
                        />
                        <Heading
                            lineHeight={1.4}
                            as="h1"
                            fontSize={'32px'}
                            fontWeight={'600'}
                            width={'90%'}
                            noOfLines={2}
                            className="absolute top-8 left-6"
                            color={'white'}
                        >
                            Trải nghiệm của bạn bắt đầu sau 3 ngày nữa
                        </Heading>
                    </Box>
                    <HStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch" p={4}>
                        <Flex alignItems={'center'} direction={'column'} minW={'fit-content'} w={'45%'}>
                            <Text fontSize={'14px'} fontWeight={'600'} width={'full'}>
                                Bắt đầu
                            </Text>
                            <Text fontSize={'16px'} mt={1} fontWeight={'700'} width={'full'} letterSpacing={'tight'}>
                                Th 4, 3 thg 5
                            </Text>
                            <Text fontSize={'14px'} fontWeight={'400'} width={'full'}>
                                13:00
                            </Text>
                        </Flex>
                        <Flex alignItems={'center'} direction={'column'}>
                            <Text fontSize={'14px'} fontWeight={'600'} width={'full'}>
                                Kết thúc
                            </Text>
                            <Text fontSize={'16px'} mt={1} fontWeight={'700'} width={'full'} letterSpacing={'tight'}>
                                Th 4, 3 thg 5
                            </Text>
                            <Text fontSize={'14px'} fontWeight={'400'} width={'full'}>
                                13:00
                            </Text>
                        </Flex>
                    </HStack>
                </Box>
                <Box backgroundColor={'white'} w={'full'} m={4} p={6} boxShadow={'base'} borderRadius={'md'}>
                    <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={2}>
                        Hướng dẫn chỉ đường
                    </Heading>
                    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={5} align="stretch">
                        <Box pt={4}>
                            <Heading lineHeight={1.4} as="h1" fontSize={'16px'} fontWeight={'600'} width={'full'} noOfLines={2}>
                                Địa chỉ
                            </Heading>
                            <Text fontSize={'16px'} fontWeight={'400'} width={'full'} mt={1} noOfLines={2}>
                                190 Nguyễn Văn Thoại, An Hải Bắc, Sơn Trà, Đà Nẵng, Việt Nam
                            </Text>
                        </Box>
                        <Box>
                            <Heading lineHeight={1.4} as="h1" fontSize={'16px'} fontWeight={'600'} width={'full'} noOfLines={2}>
                                Nơi tổ chức hoạt động
                            </Heading>
                            <Text fontSize={'16px'} fontWeight={'400'} width={'full'} mt={1} noOfLines={2}>
                                190 Nguyễn Văn Thoại, An Hải Bắc, Sơn Trà, Đà Nẵng, Việt Nam
                            </Text>
                        </Box>
                    </VStack>
                </Box>
                <Box backgroundColor={'white'} w={'full'} m={4} p={6} boxShadow={'base'} borderRadius={'md'}>
                    <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={2}>
                        Giới thiệu về trải nghiệm
                    </Heading>
                    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={5} align="stretch">
                        <Box pt={4}>
                            <Heading lineHeight={1.4} as="h1" fontSize={'16px'} fontWeight={'600'} width={'full'} noOfLines={2}>
                                Chúng ta sẽ làm gì
                            </Heading>
                            <Text fontSize={'16px'} fontWeight={'400'} width={'full'} mt={1} noOfLines={2}>
                                190 Nguyễn Văn Thoại, An Hải Bắc, Sơn Trà, Đà Nẵng, Việt Nam
                            </Text>
                        </Box>
                        <Box>
                            <Heading lineHeight={1.4} as="h1" fontSize={'16px'} fontWeight={'600'} width={'full'} noOfLines={2}>
                                Nơi tổ chức hoạt động
                            </Heading>
                            <Text fontSize={'16px'} fontWeight={'400'} width={'full'} mt={1} noOfLines={2}>
                                190 Nguyễn Văn Thoại, An Hải Bắc, Sơn Trà, Đà Nẵng, Việt Nam
                            </Text>
                        </Box>
                    </VStack>
                </Box>
            </Stack>
            <Stack
                // position="relative"

                w={'full'}
                className={`block fixed left-0 right-0 bottom-0 top-0 sm:block sm:sticky top-[76px]  h-map flex-grow bg-teal-900 bg-opacity-10   duration-100`}
            >
                {/* <MapTrip></MapTrip> */}
            </Stack>
        </Box>
    );
};

export default TripDetail;
TripDetail.requireAuth = true;
TripDetail.getLayout = function (page: ReactElement) {
    return (
        <>
            <HeaderNoSearch />
            {page}
        </>
    );
};
