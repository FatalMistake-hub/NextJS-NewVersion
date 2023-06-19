import {
    Heading,
    Text,
    Button,
    IconButton,
    VStack,
    StackDivider,
    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    Image,
    PopoverFooter,
    PopoverArrow,
    Input,
    InputLeftAddon,
    InputGroup,
    MenuButton,
    Menu,
    MenuItem,
    MenuList,
    useToast,
} from '@chakra-ui/react';

import { BiChevronDown, BiChevronLeft, BiChevronUp } from 'react-icons/bi';
import { ESearchMenu } from 'src/utils/constants/Enums';
import { useAppSelector, useAppDispatch } from 'src/redux/hook';
import { FC, useState, FocusEvent, FormEvent } from 'react';

import {
    DECREASE_ADULTS,
    DECREASE_CHILDREN,
    DECREASE_INFANTS,
    INCREASE_ADULTS,
    INCREASE_CHILDREN,
    INCREASE_INFANTS,
    RESET_GUESTS,
    selectSearch,
} from 'src/redux/slice/searchSlice';
import Counter from '@components/Search/Counter';
import CardPayment from '@components/Card/CardPayment';
import { useRouter } from 'next/router';
import useGetDetailTour from 'src/hooks/guest/tours/useGetDetailTour';
import moment from 'moment';
import { TimeBookViewDtoList } from 'src/types/timeBooking.type';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import usePostPaymentTour from 'src/hooks/guest/payment/usePostPaymentTour';
import useWallet from 'src/hooks/guest/payment/useWallet';
import { useSession } from 'next-auth/react';
const Payment = () => {
    const [searchMenu, setSearchMenu] = useState<ESearchMenu | null>(null);
    const router = useRouter();

    const { location, checkIn, checkOut, guests } = useAppSelector(selectSearch);
    const dispatch = useAppDispatch();
    // handler
    const handleOnBlur = (event?: FocusEvent<HTMLElement>) => {
        const { relatedTarget } = event || {};
        if (!relatedTarget) {
            setSearchMenu(null);
            return;
        }
        const relatedTargetClassList = Array.from((relatedTarget as Element)?.classList);
        const result = relatedTargetClassList.some((className) => {
            const prefix = ['rdr', 'btn'];
            if (prefix.includes(className.slice(0, 3))) return true;
        });
        if (!result) setSearchMenu(null);
    };
    const { isLoading, isError, isSuccess, postPaymentTour } = usePostPaymentTour();
    const { useGetWallet, useCreateWallet, useUpdateWallet } = useWallet();

    const { data: session, status } = useSession();
    const toast = useToast();
    const paymentForm = useFormik({
        initialValues: {
            accountNumber: Number(useGetWallet.data?.data.accountNumber) || undefined,
            bankName: '',
            totalMoney: 0,
            data: [
                {
                    guestType: '',
                    quantity: 0,
                },
                {
                    guestType: '',
                    quantity: 0,
                },
                {
                    guestType: '',
                    quantity: 0,
                },
            ],
            priceTotal: 0,

            time_book_id: JSON.parse(router.query.timeId as string),
            tourId: router.query.tourId as string,
        },
        validationSchema: Yup.object({
            accountNumber: Yup.number().required('Bắt buộc!'),
        }),
        onSubmit: async (values) => {
            values.bankName = 'NCB';
            values.totalMoney = 10000000;
            values.data = [
                {
                    guestType: 'ADULTS',
                    quantity: guests.adults,
                },
                {
                    guestType: 'CHILDREN',
                    quantity: guests.children,
                },
                {
                    guestType: 'INFANTS',
                    quantity: guests.infants,
                },
            ];
            values.priceTotal = Number(
                Number(router.query.priceOnePerson) * guests.adults +
                    (Number(router.query.priceOnePerson) * guests.children * 70) / 100 +
                    (Number(router.query.priceOnePerson) * guests.infants * 50) / 100,
            );
            if (guests.adults || guests.children || guests.infants) {
                values.accountNumber && !session?.user.isWallet
                    ? await useCreateWallet
                          .mutateAsync({
                              totalMoney: values.totalMoney,
                              accountNumber: String(values.accountNumber),
                              bankName: values.bankName,
                          })
                          .then((res) => {
                              res.status === 201 &&
                                  postPaymentTour({
                                      time_book_id: values.time_book_id,
                                      tourId: values.tourId,
                                      data: values.data,
                                      priceTotal: values.priceTotal,
                                  });
                          })
                    : await useUpdateWallet
                          .mutateAsync({
                              totalMoney: values.totalMoney,
                              accountNumber: String(values.accountNumber),
                              bankName: values.bankName,
                              walletId: useGetWallet.data?.data.walletId,
                          })
                          .then((res) => {
                              res.status === 200 &&
                                  postPaymentTour({
                                      time_book_id: values.time_book_id,
                                      tourId: values.tourId,
                                      data: values.data,
                                      priceTotal: values.priceTotal,
                                  });
                          });
            } else {
                toast({
                    title: 'Vui lòng chọn số lượng khách',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
            }
        },
    });
    return (
        <form onSubmit={paymentForm.handleSubmit}>
            <div className="w-full h-full ">
                <div className="px-20 max-w-[1280px] mx-auto pb-12 pt-16 flex items-center">
                    <IconButton
                        colorScheme={'blackAlpha'}
                        size={'lg'}
                        color={'black'}
                        icon={<BiChevronLeft className="w-6 h-6" />}
                        rounded={'full'}
                        variant="ghost"
                        aria-label={'CheckOut'}
                    ></IconButton>
                    <Heading lineHeight={1.4} as="h1" fontSize={'32px'} fontWeight={'600'} width={'full'} noOfLines={1}>
                        Xác nhận và thanh toán
                    </Heading>
                </div>
                <div className="mx-auto px-20 flex items-stretch justify-start w-full flex-wrap  max-w-[1280px]  ">
                    <div className="w-[50%] relative">
                        <VStack divider={<StackDivider borderColor="black.200" />} align="stretch" width={'full'}>
                            <Box pb={4}>
                                <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1} pb={8}>
                                    Trải nghiệm của bạn
                                </Heading>
                                <div className="mr-6">
                                    <Heading lineHeight={1.4} as="h3" fontSize={'16px'} fontWeight={'700'} width={'full'} noOfLines={1}>
                                        Ngày
                                    </Heading>
                                    <Text fontSize={'16px'} width={'full'} noOfLines={1} mt={2}>
                                        {moment(router.query.day).format('dddd, DD MMMM')} {router.query.start_time} -{' '}
                                        {router.query.end_time}
                                    </Text>
                                </div>
                                <div className="pt-4">
                                    <Heading lineHeight={1.4} as="h3" fontSize={'16px'} fontWeight={'700'} width={'full'} noOfLines={1}>
                                        Khách
                                    </Heading>
                                    <Popover placement="bottom" closeOnBlur={true}>
                                        <PopoverTrigger>
                                            <Button
                                                variant={'outline'}
                                                colorScheme={'black'}
                                                mt={4}
                                                width={'50%'}
                                                justifyContent="space-between"
                                                size={'lg'}
                                            >
                                                {' '}
                                                {guests.adults + guests.children + guests.infants} Khách
                                                <BiChevronUp className="w-6 h-6" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent color="black" bg="white" p={4} boxShadow={'xl'}>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody>
                                                <div>
                                                    <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                                        <div className="flex-grow">
                                                            <h2 className="font-medium">Người lớn</h2>
                                                            <p className="text-sm leading-4 text-gray-300">Từ 13 tuổi trở lên</p>
                                                        </div>
                                                        <Counter
                                                            type="adults"
                                                            value={guests.adults}
                                                            maxValue={16}
                                                            onIncrease={() => dispatch(INCREASE_ADULTS(1))}
                                                            onDescrease={() => dispatch(DECREASE_ADULTS(1))}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                                        <div className="flex-grow">
                                                            <h2 className="font-medium">Trẻ em</h2>
                                                            <p className="text-sm leading-4 text-gray-300">Độ tuổi 2 - 12</p>
                                                        </div>
                                                        <Counter
                                                            type="children"
                                                            value={guests.children}
                                                            maxValue={5}
                                                            onIncrease={() => dispatch(INCREASE_CHILDREN(1))}
                                                            onDescrease={() => dispatch(DECREASE_CHILDREN(1))}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex py-4">
                                                        <div className="flex-grow">
                                                            <h2 className="font-medium">Em bé</h2>
                                                            <p className="text-sm leading-4 text-gray-300">Dưới 2 tuổi</p>
                                                        </div>
                                                        <Counter
                                                            type="infants"
                                                            value={guests.infants}
                                                            maxValue={5}
                                                            onIncrease={() => dispatch(INCREASE_INFANTS(1))}
                                                            onDescrease={() => dispatch(DECREASE_INFANTS(1))}
                                                        />
                                                    </div>
                                                </div>
                                            </PopoverBody>
                                            <PopoverFooter border="0" display="flex" alignItems="center" justifyContent="flex-end">
                                                <Button colorScheme="teal">Next</Button>
                                            </PopoverFooter>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </Box>
                            <Box py={4}>
                                <div className="flex items-center justify-between">
                                    <Heading
                                        lineHeight={1.4}
                                        as="h2"
                                        fontSize={'22px'}
                                        fontWeight={'600'}
                                        width={'full'}
                                        noOfLines={1}
                                        mr={6}
                                        mb={1}
                                    >
                                        Thanh toán bằng
                                    </Heading>
                                    <div className="">
                                        <img
                                            src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBd2w2SHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--86c9a5822c522ee441f5a6e55a9c9cfdc61b09bc/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--15c3f2f3e11927673ae52b71712c1f66a7a1b7bd/logo%20VNPAY-02.png"
                                            alt="Thẻ Visa"
                                            height="9"
                                            aria-hidden="true"
                                            className="w-32 h-24"
                                        ></img>
                                    </div>
                                </div>
                                <div className="mr-6">
                                    <Menu>
                                        <MenuButton
                                            w={'100%'}
                                            textAlign={'left'}
                                            colorScheme="blackAlpha"
                                            variant={'outline'}
                                            as={Button}
                                            rightIcon={<BiChevronDown />}
                                        >
                                            Chọn ngân hàng : NCB
                                        </MenuButton>
                                        <MenuList w={'full'}>
                                            <MenuItem minH="48px">
                                                <Image
                                                    boxSize="2rem"
                                                    borderRadius="full"
                                                    src="data:image/jpeg;base64,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"
                                                    alt="Fluffybuns the destroyer"
                                                    mr="12px"
                                                />
                                                <span>NCB</span>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    <InputGroup colorScheme="blackAlpha" variant={'outline'} py={4}>
                                        <InputLeftAddon children="STK" />
                                        <Input
                                            colorScheme="blackAlpha"
                                            variant={'outline'}
                                            type="number"
                                            placeholder="Số thẻ"
                                            id="accountNumber"
                                            name="accountNumber"
                                            value={paymentForm.values.accountNumber}
                                            onChange={paymentForm.handleChange}
                                        />
                                    </InputGroup>
                                </div>
                            </Box>
                            <Box py={4}>
                                <Text fontSize={'12px'} pt={4} pb={8}>
                                    Bằng việc chọn nút bên dưới, bạn đồng ý với Cam kết và miễn trừ của khách, Chính sách hủy, Chính sách
                                    hoàn tiền cho khách và Hướng dẫn về giãn cách xã hội và các hướng dẫn khác liên quan đến COVID-19 của
                                    Airbnb.
                                </Text>
                                <Button type="submit" size={'lg'} width={'50%'} py={7} colorScheme={'teal'}>
                                    Xác nhận và thanh toán
                                </Button>
                            </Box>
                        </VStack>
                    </div>
                    <div className="w-[41.6667%] ml-[8.3333%] relative">
                        <CardPayment tourId={router.query.tourId} />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Payment;
Payment.requireAuth = true;
