import {
    Heading,
    IconButton,
    VStack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    TabIndicator,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Badge,
    Box,
    Flex,
    TableCaption,
    TableContainer,
    HStack,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import Rating from '@components/Card/Rating';
import Image from 'next/image';
import { BiChevronLeft, BiDotsHorizontal } from 'react-icons/bi';

const Reservations = () => {
    return (
        <div className="px-6 min-h-screen">
            <VStack float={'left'} alignItems={'flex-start'} w={'full'} className=" border-b border-b-gray-900">
                <IconButton
                    aria-label="back"
                    icon={<BiChevronLeft />}
                    size={'lg'}
                    float={'left'}
                    rounded={'full'}
                    colorScheme={'blackAlpha'}
                    color={'black'}
                    variant={'ghost'}
                    fontSize={'24px'}
                    mt={3}
                    ml={-3}
                />
                <Heading lineHeight={1.4} as="h1" fontSize={'32px'} fontWeight={'600'} width={'full'} noOfLines={2} pt={3} pb={6}>
                    Đặt trải nghiệm
                </Heading>
                <div className="w-full border-b border-b-gray-900 ">
                    <Tabs position="relative" variant="unstyled">
                        <TabList>
                            <Tab className="rounded-xl font-semibold  hover:bg-gray-100 ">Sắp tới</Tab>
                            <Tab className="rounded-xl font-semibold  hover:bg-gray-100">Đã hoàn tất</Tab>
                            <Tab className="rounded-xl font-semibold  hover:bg-gray-100">Đã hủy</Tab>
                            <Tab className="rounded-xl font-semibold  hover:bg-gray-100">Tất cả</Tab>
                        </TabList>
                        <TabIndicator mt="-1.5px" height="2px" bg="teal.500" borderRadius="1px" />
                    </Tabs>
                </div>
                {/* <Text py={'128px'} fontSize={'18px'} fontWeight={700} w={'full'} textAlign={'center'}>
                    Bạn không có yêu cầu đặt phòng nào
                </Text> */}

                <TableContainer w={'full'} pt={6}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Trạng thái</Th>

                                <Th>Người đặt</Th>
                                <Th>Bắt đầu</Th>
                                <Th>Đặt lúc</Th>
                                <Th>Trải nghiệm</Th>
                                <Th>Tổng thanh toán</Th>
                                <Th></Th>

                                {/* <Th isNumeric>multiply by</Th> */}
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr className=" rounded-2xl hover:bg-gray-100 ">
                                <Td>
                                    <Badge px={2} rounded={'xl'} variant="solid" colorScheme="green">
                                        Xác nhận
                                    </Badge>
                                </Td>

                                <Td>
                                    <VStack float={'left'} alignItems={'flex-start'}>
                                        <Text fontSize={'16px'} fontWeight={600} noOfLines={1} as={'p'} color={'teal'} textAlign={'left'}>
                                            NguyenTriAn
                                        </Text>
                                        <Text fontSize={'12px'} fontWeight={400} noOfLines={1} as={'p'} textAlign={'left'}>
                                            6 adults, 2 children, 1 infant
                                        </Text>
                                    </VStack>
                                </Td>
                                <Td>
                                    <Text fontSize={'14px'} fontWeight={400} noOfLines={1} as={'p'} textAlign={'left'}>
                                        26 Dec 2022
                                    </Text>
                                </Td>
                                <Td>
                                    <VStack float={'left'} alignItems={'flex-start'}>
                                        <Text fontSize={'16px'} fontWeight={400} noOfLines={1} as={'p'} textAlign={'left'}>
                                            26 Dec 2022
                                        </Text>
                                        <Text fontSize={'12px'} fontWeight={300} noOfLines={1} as={'p'} textAlign={'left'}>
                                            08:23
                                        </Text>
                                    </VStack>
                                </Td>
                                <Td>
                                    <Flex alignItems={'center'}>Chuyến đi nửa ngày Khám phá Địa đạo Củ Chi</Flex>
                                </Td>
                                <Td>2,0000 VND</Td>
                                <Td minW={'300px'}>
                                    <HStack justifyContent={'flex-end'} gap={2}>
                                        <Button variant={'outline'} colorScheme={'teal'}>
                                            Chi tiết
                                        </Button>
                                        <Menu>
                                            <MenuButton
                                                as={IconButton}
                                                aria-label="Options"
                                                icon={<BiDotsHorizontal />}
                                                variant="outline"
                                            />
                                            <MenuList>
                                                <MenuItem command="⌘T">New Tab</MenuItem>
                                                <MenuItem command="⌘N">New Window</MenuItem>
                                                <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
                                                <MenuItem command="⌘O">Open File...</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </HStack>
                                </Td>

                                {/* <Td isNumeric>25.4</Td> */}
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>
        </div>
    );
};

export default Reservations;
Reservations.Layout = 'HostingLayout';
