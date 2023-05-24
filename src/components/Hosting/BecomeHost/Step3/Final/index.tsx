import { Box, VStack, Text, Heading, Center, Code } from '@chakra-ui/react';
import Image from 'next/image';
import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from 'src/redux/hook';
import { selectBecomeHost, SET_btnSTATUS } from 'src/redux/slice/becomeHostSlice';
const FinalSt3 = () => {
    const { tour } = useAppSelector(selectBecomeHost);
    const dispatch = useAppDispatch();
    useMemo(() => {
        if (tour.priceOnePerson === null) {
            dispatch(SET_btnSTATUS(true));
        } else {
            dispatch(SET_btnSTATUS(false));
        }
    }, [tour.priceOnePerson]);
    return (
        <>
            <div className="w-full justify-center items-center flex min-h-[calc(100vh-176px)] px-20">
                <VStack w={'950px'} align={'left'} gap={2}>
                    <Heading
                        lineHeight={'54px'}
                        as="h1"
                        fontSize={'48px'}
                        fontWeight={'600'}
                        width={'full'}
                        noOfLines={2}
                        letterSpacing={'tight'}
                        pb={2}
                    >
                        Xem lại mục cho thuê của bạn trước khi đăng.
                    </Heading>
                    <Text fontSize={'18px'} fontWeight={'400'} pb={8}>
                        Dưới đây là những thông tin mà chúng tôi sẽ hiển thị cho khách. Hãy đảm bảo mọi thứ đều ổn thỏa.
                    </Text>
                    <Box w={'full'} h={'full'} display="flex">
                        <div className="min-w-[356px] max-h-[420px] p-4 shadow-2xl rounded-xl">
                            <Center w="full" minH="320px" position={'relative'}>
                                <Image
                                    src={tour.imageDtoList[0]?.link}
                                    alt={`Picture of `}
                                    layout="fill"
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL={tour.imageDtoList[0]?.link}
                                    className="rounded-xl"
                                />
                            </Center>
                            <Box w="full" mt={4}>
                                <Text fontSize={'16px'} fontWeight={'500'}>
                                    {tour.title}
                                </Text>
                                <Text fontSize={'16px'} fontWeight={'500'}>
                                    {tour.priceOnePerson?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} /{' '}
                                    <span className="text-base font-normal">người</span>
                                </Text>
                            </Box>
                        </div>
                        <div className="w-full min-h-full ml-20 ">
                            <VStack w={'full'} minH={'full'} align={'left'} gap={4} justify={'center'}>
                                <Heading
                                    lineHeight={'32px'}
                                    as="h2"
                                    fontSize={'22px'}
                                    fontWeight={'600'}
                                    width={'full'}
                                    noOfLines={2}
                                    letterSpacing={'tight'}
                                    pb={2}
                                >
                                    Tiếp theo là gì?
                                </Heading>
                                <div className="px-2 w-full flex">
                                    <div className="flex mb-6">
                                        <svg
                                            viewBox="0 0 32 32"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            role="presentation"
                                            focusable="false"
                                            className="w-8 h-8 mr-4"
                                        >
                                            <path d="m25 30h-18a5.00588 5.00588 0 0 1 -5-5v-18a5.00588 5.00588 0 0 1 5-5h5a5 5 0 0 1 8 0h5a5.00588 5.00588 0 0 1 5 5v18a5.00588 5.00588 0 0 1 -5 5zm-18-26a3.00328 3.00328 0 0 0 -3 3v18a3.00328 3.00328 0 0 0 3 3h18a3.00328 3.00328 0 0 0 3-3v-18a3.00328 3.00328 0 0 0 -3-3h-6.1123l-.28809-.49951a3.0015 3.0015 0 0 0 -5.19873.00049l-.28906.49902zm17.41406 8-1.41406-1.41406-9.5 9.5-4.5-4.5-1.41406 1.41406 5.91406 5.91406zm-8.41406-6a1 1 0 1 0 -1-1 1 1 0 0 0 1 1z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col ">
                                        <Text fontSize={'18px'} fontWeight={'600'}>
                                            Khi nhấn nút{'  '}
                                            <Code fontSize={'18px'} fontWeight={'600'} rounded={'lg'} px={2} colorScheme={'teal'}>
                                                "Hoàn tất"
                                            </Code>
                                            {'  '}ở cuối trang, trải nghiệm của bạn sẽ được đăng lên trang web.
                                        </Text>
                                        <Text fontSize={'14px'} fontWeight={'400'}>
                                            Hệ thống sẽ kiểm tra các thông tin trải nghiệm của bạn và tiến hành đăng lên trang web.
                                        </Text>
                                    </div>
                                </div>
                                <div className="px-2 w-full flex">
                                    <div className="flex mb-6">
                                        <svg
                                            viewBox="0 0 32 32"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            role="presentation"
                                            focusable="false"
                                            className="w-8 h-8 mr-4"
                                        >
                                            <path d="m20.7928932 4.79289322c1.7712362-1.77123617 4.6429774-1.77123617 6.4142136 0 1.715885 1.71588503 1.7695064 4.46456828.1608642 6.24500318l-.1608642.1692104-18.2071068 18.2071068c-.33339801.333398-.77238421.536932-1.23836072.5780458l-.17585284.0077406h-5.58578644v-5.5857864c0-.471496.16648982-.9258264.46691315-1.2843934l.11887329-.1298202zm-1.7928932 4.62157287-15 14.99974751v3.5857864h3.58578644l14.99921356-15.0005339zm6.7928932-3.20735931c-.9471359-.94713595-2.4571608-.98831577-3.4532437-.12353947l-.1325427.12353947-1.7931068 1.79235931 3.586 3.58600001 1.7928932-1.79257288c.947136-.94713595.9883158-2.45716087.1235395-3.45324369z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col ">
                                        <Text fontSize={'18px'} fontWeight={'600'}>
                                            Quản lý trải nghiệm của bạn.
                                        </Text>
                                        <Text fontSize={'14px'} fontWeight={'400'}>
                                            Sau khi đăng tải hoàn tất bạn sẽ được điều hướng đến trang quản lý trải nghiệm.
                                        </Text>
                                    </div>
                                </div>
                                <div className="px-2 w-full flex">
                                    <div className="flex mb-6">
                                        <svg
                                            viewBox="0 0 32 32"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            role="presentation"
                                            focusable="false"
                                            className="w-8 h-8 mr-4"
                                        >
                                            <path d="m11.6667 0-.00095 1.666h8.667l.00055-1.666h2l-.00055 1.666 6.00065.00063c1.0543745 0 1.9181663.81587127 1.9945143 1.85073677l.0054857.14926323v15.91907c0 .4715696-.1664445.9258658-.4669028 1.2844692l-.1188904.1298308-8.7476886 8.7476953c-.3334303.3332526-.7723097.5367561-1.2381975.5778649l-.1758207.0077398h-12.91915c-2.68874373 0-4.88181754-2.1223321-4.99538046-4.7831124l-.00461954-.2168876v-21.66668c0-1.05436021.81587582-1.91815587 1.85073739-1.99450431l.14926261-.00548569 5.999-.00063.00095-1.666zm16.66605 11.666h-24.666v13.6673c0 1.5976581 1.24893332 2.9036593 2.82372864 2.9949072l.17627136.0050928 10.999-.0003.00095-5.6664c0-2.6887355 2.122362-4.8818171 4.7832071-4.9953804l.2168929-.0046196 5.66595-.0006zm-.081 8-5.58495.0006c-1.5977285 0-2.9037573 1.2489454-2.9950071 2.8237299l-.0050929.1762701-.00095 5.5864zm-18.586-16-5.999.00062v5.99938h24.666l.00065-5.99938-6.00065-.00062.00055 1.66733h-2l-.00055-1.66733h-8.667l.00095 1.66733h-2z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col ">
                                        <Text fontSize={'18px'} fontWeight={'600'}>
                                            Thiết lập lịch
                                        </Text>
                                        <Text fontSize={'14px'} fontWeight={'400'}>
                                            Thiết lập lịch tại trang quản lý để có thể chọn hoặc chỉnh sửa ngày có thể đón khách.
                                        </Text>
                                    </div>
                                </div>
                            </VStack>
                        </div>
                    </Box>
                </VStack>
            </div>
        </>
    );
};

export default FinalSt3;
