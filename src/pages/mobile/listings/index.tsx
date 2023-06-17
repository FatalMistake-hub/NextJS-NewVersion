import { Button, Card, CardBody, CardFooter, Heading, SimpleGrid, Stack, Text, Image, Flex, HStack, StackDivider } from '@chakra-ui/react';
import CardTrip from '@components/Card/CardTrip';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import useGetAllGuestOrder from 'src/hooks/hosting/order/useGetAllGuestOrder';
import { useAppDispatch } from 'src/redux/hook';
import { SET_orderIdBlockChain, SET_publicKey_CREATER } from 'src/redux/slice/authSlice';
import { truncate } from 'src/utils/string';

const MobileListings = () => {
    const { connected, publicKey } = useWallet();
    const { data, isLoading, isError, isSuccess } = useGetAllGuestOrder();
    const dispatch = useAppDispatch();
    console.log(data);
    return (
        <div className="">
            <WalletMultiButton className="phantom-button z-50 ml-2 mr-4 rounded-2xl">
                <span className="text-sm font-medium text-black">{connected ? truncate(publicKey?.toString()) : 'Connect Wallet'}</span>
            </WalletMultiButton>
            <Text fontSize={'24px'} fontWeight={'600'} width={'full'} py={4}>
                Các chuyến đi đã đặt
            </Text>
            <SimpleGrid minChildWidth={'100%'} gap={4} maxH={'100vh'} overflowY={'scroll'}>
                {data?.map(
                    (item, index) =>
                        item.statusOrder === 'SUCCESS' &&
                        item.orderIdBlockChain &&
                        item.publicKey && (
                            <Link href={'/mobile/indentity/guest'}>
                                <Card
                                    direction={{ base: 'column', sm: 'row' }}
                                    overflow="hidden"
                                    variant="outline"
                                    onClick={() => {
                                        dispatch(SET_orderIdBlockChain(item.orderIdBlockChain)),
                                            dispatch(SET_publicKey_CREATER(item.publicKey));
                                    }}
                                >
                                    <Image objectFit="cover" maxW={{ base: '100%', sm: '200px' }} src={item.imageMain} alt="Caffe Latte" />

                                    <Stack>
                                        <CardBody>
                                            <Heading noOfLines={2} size="md">
                                                {item.tour_title}
                                            </Heading>

                                            <HStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch" p={4}>
                                                <Flex alignItems={'center'} direction={'column'} minW={'fit-content'} w={'45%'}>
                                                    <Text fontSize={'14px'} fontWeight={'600'} width={'full'}>
                                                        Bắt đầu
                                                    </Text>
                                                    <Text
                                                        fontSize={'16px'}
                                                        mt={1}
                                                        fontWeight={'700'}
                                                        width={'full'}
                                                        letterSpacing={'tight'}
                                                    >
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
                                                    <Text
                                                        fontSize={'16px'}
                                                        mt={1}
                                                        fontWeight={'700'}
                                                        width={'full'}
                                                        letterSpacing={'tight'}
                                                    >
                                                        Th 4, 3 thg 5
                                                    </Text>
                                                    <Text fontSize={'14px'} fontWeight={'400'} width={'full'}>
                                                        13:00
                                                    </Text>
                                                </Flex>
                                            </HStack>
                                        </CardBody>
                                    </Stack>
                                </Card>
                            </Link>
                        ),
                )}
            </SimpleGrid>
        </div>
    );
};

export default MobileListings;
MobileListings.Layout = 'MobileLayout';
