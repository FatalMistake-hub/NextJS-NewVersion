import { Box, Flex, Heading, HStack, StackDivider, VStack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { FC } from 'react';
import { IOrder } from 'src/types/order.type';
interface Props {
    data: IOrder;

}
const CardTrip: FC<Props> = ({ data }) => {

    return (
        <Link href={'/trips/1'}>
            <Box w="100%" maxW={'700px'} borderRadius={'lg'} boxShadow={'xl'} display={'flex'} className="hover:translate-x-1 translate-y-1 ">
                <Box w="60%" p={6}>
                    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={5} align="stretch">
                        <Box>
                            <Heading lineHeight={1.4} as="h1" fontSize={'26px'} fontWeight={'600'} width={'full'} noOfLines={2}>
                                {data.tour_title}
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
                                        {/* 190 Nguyễn Văn Thoại, An Hải Bắc, Sơn Trà, Đà Nẵng, Việt Nam */}
                                        {data.city}
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
                        src={data.imageMain}
                        alt={`Picture of `}
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL={data.imageMain}
                        className=" rounded-r-lg"
                    />
                </Box>
            </Box>
        </Link>
    );
};

export default CardTrip;
