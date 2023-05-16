import { Box, Flex, Heading, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Image from 'next/image';
import useBgGradient from 'src/hooks/style/useBgGradient';
const Account = () => {
    const bg = useBgGradient();
    return (
        <Tabs position="relative" variant="unstyled">
            <div className="min-h-screen flex justify-center w-full">
                <div className="w-[1440px]  mx-auto overflow-x-clip pt-16 flex gap-20 ">
                    <Box position="relative">
                        <Flex
                            direction={'column'}
                            w={'full'}
                            position={'sticky'}
                            top={'118px'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            pl={8}
                            pb={16}
                        >
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                gap={2}
                                borderRadius={'2xl'}
                                w={'300px'}
                                py={8}
                                px={6}
                                boxShadow={'xl'}
                                border={'1px solid #e4e7eb53'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <div className="relative w-[104px] h-[104px]">
                                    <Image
                                        src={
                                            'https://a0.muscache.com/im/pictures/user/User-484410468/original/f28d0fde-327c-4fd0-943d-e7080640111a.png?im_w=240'
                                        }
                                        alt={`Picture of `}
                                        layout="fill"
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={
                                            'https://a0.muscache.com/im/pictures/user/User-484410468/original/f28d0fde-327c-4fd0-943d-e7080640111a.png?im_w=240'
                                        }
                                    />
                                </div>
                                <div className="flex flex-col justify-center items-center max-w-[160px]">
                                    <Heading
                                        lineHeight={1.4}
                                        as="h1"
                                        fontSize={'26px'}
                                        fontWeight={'700'}
                                        noOfLines={2}
                                        textAlign={'center'}
                                    >
                                        Nhat Minh
                                    </Heading>
                                    <Text fontSize={'14px'} fontWeight={'600'} mt={1} textAlign={'center'}>
                                        Chủ nhà/Người tổ chức mới
                                    </Text>
                                </div>
                            </Box>
                            <Box w={'full'} mt={8}>
                                <TabList display={'flex'} flexDirection={'column'}>
                                    <Tab
                                        fontSize={'16px'}
                                        fontWeight={'600'}
                                        borderRadius={8}
                                        mt={1}
                                        p={4}
                                        justifyContent={'flex-start'}
                                        _selected={{
                                            color: 'teal',
                                            borderRight: '3px solid teal',
                                            bg: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,244,206,0) 0%, rgba(0,176,160,0.040861412924544815) 51%, rgba(0,128,128,0.16411071264443278) 100%)',
                                        }}
                                    >
                                        Thông tin cá nhân
                                    </Tab>
                                    <Tab
                                        fontSize={'16px'}
                                        fontWeight={'600'}
                                        mt={1}
                                        p={4}
                                        borderRadius={8}
                                        justifyContent={'flex-start'}
                                        _selected={{
                                            color: 'teal',
                                            borderRight: '3px solid teal',
                                            bg: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,244,206,0) 0%, rgba(0,176,160,0.040861412924544815) 51%, rgba(0,128,128,0.16411071264443278) 100%)',
                                        }}
                                    >
                                        Thanh toán & chi trả
                                    </Tab>
                                </TabList>
                            </Box>
                        </Flex>
                    </Box>
                    <Box position="relative" w={'full'}>
                        <TabPanels>
                            <TabPanel display={'flex'} justifyContent={'flex-start'}>
                                <Heading lineHeight={1.4} as="h2" fontSize={'32px'} fontWeight={'700'} noOfLines={2} textAlign={'center'}>
                                    Chỉnh sửa thông tin cá nhân
                                </Heading>
                            </TabPanel>
                            <TabPanel display={'flex'} justifyContent={'flex-start'}>
                                <Heading lineHeight={1.4} as="h2" fontSize={'32px'} fontWeight={'700'} noOfLines={2} textAlign={'center'}>
                                    Thanh toán & chi trả
                                </Heading>
                            </TabPanel>
                        </TabPanels>
                    </Box>
                </div>
            </div>
        </Tabs>
    );
};
Account.requireAuth = true;
export default Account;
Account.Layout = 'NoSearchLayout';
