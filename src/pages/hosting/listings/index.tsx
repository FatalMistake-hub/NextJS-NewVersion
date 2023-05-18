import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    VStack,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Text,
    TableCaption,
    TableContainer,
    Badge,
    IconButton,
    Stack,
    Fade,
} from '@chakra-ui/react';
import Rating from '@components/Card/Rating';
import { HeaderHosting } from '@components/layouts/common/HeaderHosting';
import Image from 'next/image';
import { ReactElement } from 'react';
import { BiCheck, BiGlobe, BiPlus, BiSearch } from 'react-icons/bi';
import { useState } from 'react';
import DetailTour from '@components/Hosting/DetailTour';
const Listings = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClickOpen = () => setIsOpen(true);
    const handleClickClose = () => setIsOpen(false);
    return (
        <div className=" pt-[86px] flex relative min-h-screen">
            <VStack w={`${isOpen ? '500px' : '100%'} `} float={'left'} className="border-r border-r-gray-700 min-h-[100vh-86px] ">
                <Box w={'full'}>
                    <Flex alignItems={'center'} justifyContent={'space-between'} pt={8} px={8} pb={4}>
                        <Heading lineHeight={1.4} as="h1" fontSize={'26px'} fontWeight={'600'} width={'full'} noOfLines={2}>
                            4 trải nghiệm cho thuê
                        </Heading>
                        {isOpen ? (
                            <IconButton
                                aria-label="add"
                                colorScheme="blackAlpha"
                                color={'black'}
                                variant="outline"
                                icon={<BiPlus />}
                                borderRadius={'full'}
                                ml={2}
                            />
                        ) : (
                            <Button colorScheme="blackAlpha" color={'black'} variant="outline" leftIcon={<BiPlus />}>
                                Tạo mục trải nghiệm
                            </Button>
                        )}
                    </Flex>
                    <Box px={8} pt={1} pb={3} maxW={'327px'}>
                        <InputGroup size={'sm'}>
                            <InputLeftElement>
                                <BiSearch />
                            </InputLeftElement>
                            <Input placeholder="Enter amount" focusBorderColor={'black'} borderRadius={'3xl'} />
                            <InputRightElement>
                                <BiCheck />
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                </Box>
                <Box w={'full'} px={5}>
                    <TableContainer>
                        <Table variant="simple">
                            {!isOpen && <TableCaption>Click chọn các trải nghiệm để chỉnh sửa chi tiết</TableCaption>}
                            <Thead>
                                <Tr>
                                    <Th>Trải nghiệm cho thuê</Th>

                                    {!isOpen && (
                                        <>
                                            <Th>Giá</Th>
                                            <Th>Thời lượng</Th>
                                            <Th>Thể loại</Th>
                                            <Th>Vị trí</Th>
                                            <Th>Sửa đổi lần cuối</Th>
                                            <Th>Đánh giá</Th>
                                        </>
                                    )}

                                    {/* <Th isNumeric>multiply by</Th> */}
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr className=" rounded-2xl hover:bg-gray-100 ">
                                    <Td w={18} minW={18} onClick={handleClickOpen}>
                                        <Flex alignItems={'center'}>
                                            <Box mr={3} position={'relative'} w={14} h={10}>
                                                <Image
                                                    src={
                                                        'https://a0.muscache.com/im/pictures/miso/Hosting-857688846684434455/original/f9d274ad-11a7-4094-be8c-242de17b1339.jpeg?aki_policy=small'
                                                    }
                                                    alt={`Picture of `}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    placeholder="blur"
                                                    blurDataURL={
                                                        'https://a0.muscache.com/im/pictures/miso/Hosting-857688846684434455/original/f9d274ad-11a7-4094-be8c-242de17b1339.jpeg?aki_policy=small'
                                                    }
                                                    className={'rounded-[4px]'}
                                                />
                                            </Box>
                                           
                                                <Text
                                                    maxW={`${isOpen ? '300px' : '500px'} `}
                                                    fontSize={'14px'}
                                                    fontWeight={600}
                                                    noOfLines={1}
                                                    
                                                    as={'p'}
                                                    
                                                >
                                                    Khám phá Địa đạo Củ Chi Chuyến đi nửa ngày Khám phá Địa đạo Củ Chi Chuyến đi nửa ngày
                                                    Khám phá Địa đạo Củ Chi Chuyến đi nửa ngày
                                                </Text>
                                            
                                        </Flex>
                                    </Td>

                                    {!isOpen && (
                                        <>
                                            <Td>3,000đ / người</Td>
                                            <Td>
                                                <Badge p={2} rounded={'xl'}>
                                                    3.5 giờ
                                                </Badge>
                                            </Td>
                                            <Td>Thể thao</Td>
                                            <Td>
                                                <Flex alignItems={'center'}>
                                                    <BiGlobe className="mr-2" /> Cẩm Lệ, Việt Nam
                                                </Flex>
                                            </Td>
                                            <Td>thg 4 30</Td>
                                            <Td>
                                                <Rating avgRating={4} rating={21} isMore={false} />
                                            </Td>
                                        </>
                                    )}

                                    {/* <Td isNumeric>25.4</Td> */}
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                    
                </Box>
            </VStack>
            {isOpen && (
                <Stack w={'full'} h={12}>
                    <Fade in={isOpen}>
                        <DetailTour onClose={handleClickClose} />
                    </Fade>
                </Stack>
            )}
        </div>
    );
};

export default Listings;
Listings.getLayout = function (page: ReactElement) {
    return (
        <>
            <HeaderHosting />
            {page}
        </>
    );
};
