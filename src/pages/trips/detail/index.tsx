import { Box, Button, Flex, Heading, HStack, Stack, StackDivider, Text, VStack, useDisclosure, Badge } from '@chakra-ui/react';
import { HeaderNoSearch } from '@components/layouts/common/HeaderNoSearch';
import MapBase from '@components/Map/MapBase';
import MapTrip from '@components/Map/MapTrip';
import Image from 'next/image';
import { ReactElement, useState } from 'react';
import { useAppSelector } from 'src/redux/hook';
import { selectAuth } from 'src/redux/slice/authSlice';
import QRCode from 'qrcode';
import { BiQr } from 'react-icons/bi';
import QrCodeModal from '@components/Modal/QrCodeModal';
import { handleColorStatus, handleNameStatus } from 'src/utils/hostUtil';
import useGetDetailTour from 'src/hooks/guest/tours/useGetDetailTour';
import { useRouter } from 'next/router';
import { Marker } from 'react-map-gl';
import { BsGeoAltFill } from 'react-icons/bs';
import ReviewModal from '@components/Modal/ReviewModal';

const TripDetail = () => {
    const [dataQr, setDataQr] = useState<string>();
    const { isOpen: isModalOpen, onClose: onModalClose, onOpen: onModalOpen } = useDisclosure();
    const { isOpen: isModalReviewOpen, onClose: onModalReviewClose, onOpen: onModalReviewOpen } = useDisclosure();
    const router = useRouter();
    const generateQr = () => {
        QRCode.toDataURL(
            `https://experience-travel.vercel.app/mobile/indentity/host?orderIdBlockChain=${router.query.orderIdBlockChain}&publicKey=${router.query.publicKey}`,
        ).then(setDataQr);
    };
    const { data: dataTour, isLoading, isError, isSuccess } = useGetDetailTour(router.query.tourId);
    return (
        <>
            <Box className="relative min-h-screen w-full flex pt-[76px]" backgroundColor={'gray.50'}>
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
                            {router.query.statusOrder === 'SUCCESS' && (
                                <div className="absolute bottom-4 right-4 z-10">
                                    <Button
                                        onClick={() => {
                                            onModalOpen(), generateQr();
                                        }}
                                        size={'sm'}
                                        colorScheme="black"
                                        bgColor={'white'}
                                        color={'black'}
                                        variant="outline"
                                        leftIcon={<BiQr />}
                                    >
                                        Mã xác nhận
                                    </Button>
                                </div>
                            )}

                            {router.query.statusOrder && (
                                <Badge
                                    py={1}
                                    px={4}
                                    rounded={'xl'}
                                    variant="solid"
                                    colorScheme={handleColorStatus(router.query.statusOrder.toString())}
                                    position="absolute"
                                    className="bottom-4 left-4"
                                    zIndex={20}
                                    fontSize={'14px'}
                                >
                                    {handleNameStatus(router.query.statusOrder.toString())}
                                </Badge>
                            )}
                            <QrCodeModal isOpen={isModalOpen} onClose={onModalClose} data={dataQr} />
                            {dataTour?.imageMain && (
                                <Image
                                    src={dataTour.imageMain}
                                    alt={`Picture of `}
                                    layout="fill"
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL={dataTour.imageMain}
                                    className=" rounded-t-md"
                                />
                            )}

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
                                {dataTour?.title}
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
                                    {dataTour?.timeBookStart?.hour?.toString().padStart(2, '0')}:
                                    {dataTour?.timeBookStart?.minutes?.toString().padStart(2, '0')}
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
                                    {dataTour?.timeBookEnd?.hour?.toString().padStart(2, '0')}:
                                    {dataTour?.timeBookEnd?.minutes?.toString().padStart(2, '0')}
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
                                    {dataTour?.destination}
                                </Text>
                            </Box>
                            <Box>
                                <Heading lineHeight={1.4} as="h1" fontSize={'16px'} fontWeight={'600'} width={'full'} noOfLines={2}>
                                    Nơi tổ chức hoạt động
                                </Heading>
                                <Text fontSize={'16px'} fontWeight={'400'} width={'full'} mt={1} noOfLines={4}>
                                    <div dangerouslySetInnerHTML={{ __html: `${dataTour?.destinationDescription}` }}></div>
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
                                    {dataTour?.working}
                                </Text>
                            </Box>
                            <Box>
                                <Heading lineHeight={1.4} as="h1" fontSize={'16px'} fontWeight={'600'} width={'full'} noOfLines={2}>
                                    Nơi tổ chức hoạt động
                                </Heading>
                                <Text fontSize={'16px'} fontWeight={'400'} width={'full'} mt={1} noOfLines={4}>
                                    <div dangerouslySetInnerHTML={{ __html: `${dataTour?.destinationDescription}` }}></div>
                                </Text>
                            </Box>
                        </VStack>
                    </Box>
                </Stack>
                <Stack
                    // position="relative"

                    w={'full'}
                    className={`block fixed left-0 right-0 bottom-0 top-0 sm:block sm:sticky top-[108px]  max-h-[86vh] flex-grow bg-teal-900 bg-opacity-10 pr-8  duration-100`}
                >
                    {dataTour?.latitude && dataTour?.longitude && (
                        <MapTrip
                            center={{ longitude: Number(dataTour?.longitude), latitude: Number(dataTour?.latitude) }}
                            className="relative"
                        >
                            {router.query.statusOrder === 'USED' && (
                                <>
                                    <Button
                                        className="absolute top-4 left-4 z-10 "
                                        colorScheme="teal"
                                        variant={'solid'}
                                        onClick={onModalReviewOpen}
                                    >
                                        Đánh giá trải nghiệm{' '}
                                    </Button>
                                    <ReviewModal isOpen={isModalReviewOpen} onClose={onModalReviewClose} />
                                </>
                            )}
                            <Marker latitude={Number(dataTour?.latitude)} longitude={Number(dataTour?.longitude)}>
                                <BsGeoAltFill style={{ zIndex: 10 }} size={'3rem'} className=" text-[#3d9d9b] absolute top-0 right-1" />
                            </Marker>
                        </MapTrip>
                    )}
                </Stack>
            </Box>
        </>
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
