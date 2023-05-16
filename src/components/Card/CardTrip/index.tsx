import { Box, Flex, Heading, HStack, StackDivider, VStack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

const CardTrip = () => {
    return (
        <Link href={'/trips/1'}>
            <Box w="100%" borderRadius={'lg'} boxShadow={'xl'} display={'flex'} className="hover:translate-x-1 translate-y-1 ">
                <Box w="60%" p={6}>
                    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={5} align="stretch">
                        <Box>
                            <Heading lineHeight={1.4} as="h1" fontSize={'26px'} fontWeight={'600'} width={'full'} noOfLines={2}>
                                Đi lướt sóng ở Hội An hoặc Đà Nẵng
                            </Heading>
                            <Text fontSize={'16px'} fontWeight={'400'} width={'full'} mt={1}>
                                Trải nghiệm với sự đón tiếp của Rob
                            </Text>
                        </Box>
                        <Box>
                            <HStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
                                <Flex alignItems={'center'} direction={'column'} minW={'fit-content'}>
                                    <Text fontSize={'16px'} fontWeight={'400'} width={'full'}>
                                        06:00
                                    </Text>
                                    <Text fontSize={'16px'} fontWeight={'400'} width={'full'}>
                                        17 thg 5
                                    </Text>
                                    <Text fontSize={'14px'} fontWeight={'400'} width={'full'}>
                                        2023
                                    </Text>
                                </Flex>
                                <Flex alignItems={'center'} direction={'column'}>
                                    <Text fontSize={'16px'} fontWeight={'400'} width={'full'} noOfLines={2}>
                                        190 Nguyễn Văn Thoại, An Hải Bắc, Sơn Trà, Đà Nẵng, Việt Nam
                                    </Text>

                                    <Text fontSize={'14px'} fontWeight={'400'} width={'full'}>
                                        Vietnam
                                    </Text>
                                </Flex>
                            </HStack>
                        </Box>
                    </VStack>
                </Box>
                <Box w="40%" minHeight="200px" height={'100%'} maxHeight={'405px'} position="relative">
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
                        className=" rounded-r-lg"
                    />
                </Box>
            </Box>
        </Link>
    );
};

export default CardTrip;
