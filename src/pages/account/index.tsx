import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    IconButton,
    StackDivider,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from '@chakra-ui/react';
import AccountModal from '@components/Modal/AccountModal';
import { s } from '@fullcalendar/core/internal-common';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { BiEdit, BiEditAlt, BiGlobe, BiPhone, BiUpload } from 'react-icons/bi';
import { FaEdit, FaLanguage } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import useProfile from 'src/hooks/account/useProfile';
import useBgGradient from 'src/hooks/style/useBgGradient';
import { formatRole } from 'src/utils/guestsUtil';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { IInfoAccount } from 'src/types/account.type';
import { useDropzone } from 'react-dropzone';
import usePostToCloudinary from 'src/hooks/imageCloudinary/usePostToCloudinary';
import usePatchProfile from 'src/hooks/account/usePatchProfile';

const Account = () => {
    const { data: session, status } = useSession();
    const { data, isLoading, isSuccess, isError } = useProfile();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [props, setProps] = useState<{
        title: string;
        value: string | number | undefined;
        key: string;
    }>();
    const handleClick = async (title: string, value: string | number | undefined, key: string) => {
        await setProps({ title: title, value: value, key: key });
        await onOpen();
    };
    const { patchInfoAccount } = usePatchProfile();

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, open } = useDropzone({
        maxFiles: 1,
        accept: {
            'image/*': ['.jpeg', '.png'],
        },
        onDrop: async (acceptedFiles) => {
            
            const listLink = await Promise.all(
                acceptedFiles.map(async (file) => {
                    const link = await usePostToCloudinary(file);
                    return link;
                }),
            );
            if (listLink.length > 0) {
                await patchInfoAccount({
                    urlImage: listLink[0].link,
                });
            }
           
        },
    });
    return (
        <Tabs position="relative" variant="unstyled">
            <div className="min-h-screen flex justify-center w-full">
                <div className="w-[1440px] justify-center  mx-auto overflow-x-clip pt-16 flex gap-20 ">
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
                                <div className="relative w-[104px] h-[104px]" >
                                    <Image
                                        src={data?.urlImage ? data?.urlImage : 'https://bit.ly/broken-link'}
                                        alt={`Picture of `}
                                        layout="fill"
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={data?.urlImage ? data?.urlImage : 'https://bit.ly/broken-link'}
                                        className='rounded-full'
                                    />
                                    <Box position={'absolute'} top={0} right={-8}>
                                        <IconButton
                                            size="md"
                                            rounded="full"
                                            // colorScheme="blackAlpha"
                                            color={'black'}
                                            variant={'link'}
                                            icon={<BiUpload />}
                                            aria-label="Scroll bottom"
                                            onClick={open}
                                            // onClick={() => handleClick()}
                                        />
                                    </Box>
                                </div>
                                <div className="flex relative flex-col justify-center items-center max-w-[160px]">
                                    <Heading
                                        lineHeight={1.4}
                                        as="h1"
                                        fontSize={'26px'}
                                        fontWeight={'700'}
                                        noOfLines={2}
                                        textAlign={'center'}
                                    >
                                        {session?.user?.username}
                                    </Heading>
                                    <Text fontSize={'14px'} fontWeight={'600'} mt={1} textAlign={'center'}>
                                        {formatRole(session?.user?.role)}
                                    </Text>
                                    <Box position={'absolute'} top={0} right={-4}>
                                        <IconButton
                                            size="sm"
                                            rounded="full"
                                            // colorScheme="blackAlpha"
                                            color={'black'}
                                            variant={'link'}
                                            icon={<FiEdit2 />}
                                            aria-label="Scroll bottom"
                                            onClick={() => handleClick('tên người dùng', data?.language, 'language')}
                                        />
                                    </Box>
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
                    <Box position="relative" w={'50%'}>
                        <TabPanels>
                            <TabPanel display={'flex'} alignItems={'flex-start'} flexDirection={'column'}>
                                <Heading
                                    lineHeight={1.4}
                                    as="h2"
                                    fontSize={'32px'}
                                    fontWeight={'700'}
                                    noOfLines={2}
                                    mb={10}
                                    textAlign={'center'}
                                >
                                    Chỉnh sửa thông tin cá nhân
                                </Heading>
                                <VStack divider={<StackDivider borderColor="black.200" />} align="stretch" width={'full'} gap={4}>
                                    <Box>
                                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                            <GridItem w={'full'} display={'flex'} alignItems={'center'}>
                                                <BiGlobe fontSize={22} />
                                                <Text lineHeight={5} fontSize={'16px'} fontWeight={400} ml={2}>
                                                    Sống tại: {data?.address}
                                                </Text>
                                                <IconButton
                                                    size="sm"
                                                    rounded="full"
                                                    // colorScheme="blackAlpha"
                                                    color={'black'}
                                                    variant={'link'}
                                                    icon={<FiEdit2 />}
                                                    aria-label="Scroll bottom"
                                                    onClick={() => handleClick('vị trí', data?.address, 'address')}
                                                />
                                            </GridItem>
                                            <GridItem display={'flex'} alignItems={'center'} w={'full'}>
                                                <FaLanguage fontSize={22} />
                                                <Text lineHeight={5} fontSize={'16px'} fontWeight={400} ml={2}>
                                                    Ngôn ngữ: {data?.language}
                                                </Text>
                                                <IconButton
                                                    size="sm"
                                                    rounded="full"
                                                    // colorScheme="blackAlpha"
                                                    color={'black'}
                                                    variant={'link'}
                                                    icon={<FiEdit2 />}
                                                    aria-label="Scroll bottom"
                                                    onClick={() => handleClick('ngôn ngữ', data?.language, 'language')}
                                                />
                                            </GridItem>

                                            <GridItem display={'flex'} alignItems={'center'} w={'full'}>
                                                <BiPhone fontSize={22} />
                                                <Text lineHeight={5} fontSize={'16px'} fontWeight={400} ml={2}>
                                                    Số điện thoại: {data?.phoneNumber}
                                                </Text>
                                                <IconButton
                                                    size="sm"
                                                    rounded="full"
                                                    // colorScheme="blackAlpha"
                                                    color={'black'}
                                                    variant={'link'}
                                                    icon={<FiEdit2 />}
                                                    aria-label="Scroll bottom"
                                                    onClick={() => handleClick('số điện thoại', data?.phoneNumber, 'phoneNumber')}
                                                />
                                            </GridItem>
                                        </Grid>
                                        <Text lineHeight={5} fontSize={'16px'} fontWeight={400} mt={8}>
                                            {data?.description}
                                        </Text>
                                        <Button
                                            color={'black'}
                                            variant={'link'}
                                            onClick={() => handleClick('thông tin giới thiệu', data?.description, 'description')}
                                        >
                                            Chỉnh sửa thông tin giới thiệu
                                        </Button>
                                    </Box>
                                    <Box></Box>
                                </VStack>
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
            {props?.title && props?.key && (
                <AccountModal isOpen={isOpen} onClose={onClose} keyData={props?.key} title={props?.title} value={`${props?.value}`} />
            )}
        </Tabs>
    );
};
Account.requireAuth = true;
export default Account;
Account.Layout = 'NoSearchLayout';
