import { Box, Button, Flex, Heading, Link, SimpleGrid, Tab, TabList, Tabs, Text, VStack } from '@chakra-ui/react';
import CardReservation from '@components/Card/CardReservation';

const HostingPage = () => {
    return (
        <div className="min-h-screen">
            <VStack float={'left'} alignItems={'center'} w={'full'}>
                <Box w="100%" h="180px" bgGradient="linear(to-l, #09a3a1, #043b2e)" className="flex justify-center items-center">
                    <Heading
                        lineHeight={1.4}
                        as="h1"
                        fontSize={'32px'}
                        fontWeight={'600'}
                        width={'1280px'}
                        noOfLines={2}
                        pt={3}
                        pb={6}
                        color={'white'}
                    >
                        Chào mừng quay trở lại, Nhat
                    </Heading>
                </Box>
                <VStack width={'1280px'} float={'left'} alignItems={'flex-start'} py={16}>
                    <Flex justifyContent={'space-between'} w={'full'} mb={4}>
                        <Heading lineHeight={1.4} as="h2" fontSize={'28px'} fontWeight={'600'} noOfLines={2}>
                            Đặt trải nghiệm của bạn
                        </Heading>
                        <div className="p-2 rounded-md hover:bg-gray-100">
                            <Button variant={'link'} textDecoration={'underline'} color={'black'}>
                                Tất cả đặt trải nghiệm
                            </Button>
                        </div>
                    </Flex>
                    <Box mt={2} pb={4}>
                        <Tabs variant="unstyled" position="relative">
                            <TabList gap={2}>
                                <Tab
                                    _hover={{
                                        bg: 'blackAlpha.200',
                                    }}
                                    _selected={{
                                        color: 'black',
                                        // borderBottom: '3px solid black',
                                        border: ' 2px solid black',
                                        bg: 'blackAlpha.100',
                                    }}
                                    className="rounded-3xl border border-gray-200 "
                                    position={'relative'}
                                    color={'blackAlpha.700'}
                                >
                                    Hôm nay
                                </Tab>
                                <Tab
                                    _hover={{
                                        bg: 'blackAlpha.200',
                                    }}
                                    _selected={{
                                        color: 'black',
                                        // borderBottom: '3px solid black',
                                        border: ' 2px solid black',
                                        bg: 'blackAlpha.100',
                                    }}
                                    className="rounded-3xl border border-gray-200 "
                                    position={'relative'}
                                    color={'blackAlpha.700'}
                                >
                                    Hôm nay
                                </Tab>

                                {/* <MenuHostingNav /> */}
                            </TabList>
                        </Tabs>
                    </Box>
                    {/* <Box
                        rounded={'xl'}
                        minH={'200px'}
                        w={'full'}
                        bgColor={'rgb(247, 247, 247)'}
                        className="flex flex-col items-center justify-center "
                    >
                        <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            className="w-8 h-8"
                        >
                            <path d="m24.0001497 1c2.6882889.00069168 4.881043 2.1224181 4.9956073 4.78298655l.0047037.21687134.0007229 5.08862781-2 .0002841-.0007228-5.08837049c-.0006381-1.59771409-1.2497012-2.9036382-2.8243181-2.99526279l-.1762503-.00513652h-15.9998924c-1.59768088 0-2.90366088 1.24891996-2.99490731 2.82372721l-.00509269.17627279v19.9997571c.00038808 1.5977123 1.24926802 2.903807 2.82388326 2.9956217l.17625084.0051578 4.823918.000647-.0002682 2-4.82416099-.0006471c-2.68831483-.0010137-4.88080158-2.1230666-4.99495305-4.7836635l-.00466986-.216873v-20c0-2.6887547 2.12230671-4.88181811 4.78311038-4.99538049l.21688962-.00461951zm-2.0001497 12c4.9705627 0 9 4.0294373 9 9s-4.0294373 9-9 9-9-4.0294373-9-9 4.0294373-9 9-9zm0 2c-3.8659932 0-7 3.1340068-7 7s3.1340068 7 7 7 7-3.1340068 7-7-3.1340068-7-7-7zm3.0160589 3.1704628 1.3678822 1.4590744-6.0172744 5.6411948-3.3506078-3.1411948 1.3678822-1.4590744 1.9820589 1.8585372z"></path>
                        </svg>
                        <Text mt={2} fontSize={'14px'} fontWeight={600}>
                            Bạn chưa có nội dung này
                        </Text>
                    </Box> */}
                    <Box
                        rounded={'xl'}
                        minH={'200px'}
                        w={'full'}
                        // className="flex flex-col items-center justify-center "
                    >
                        <SimpleGrid minChildWidth="210px" spacing="40px" mt={4}>
                            <CardReservation/>
                            <CardReservation/>
                            <CardReservation/>
                            <CardReservation/>
                        </SimpleGrid>
                    </Box>
                </VStack>
            </VStack>
        </div>
    );
};
HostingPage.requireAuth = true;
export default HostingPage;
HostingPage.Layout = 'HostingLayout';
