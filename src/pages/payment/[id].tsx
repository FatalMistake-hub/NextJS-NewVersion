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
    ButtonGroup,
    PopoverFooter,
    PopoverArrow,
} from '@chakra-ui/react';

import { BiChevronLeft, BiChevronUp } from 'react-icons/bi';
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
const Payment = () => {
    const [searchMenu, setSearchMenu] = useState<ESearchMenu | null>(null);

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

    const handleOnSubmit = (event: FocusEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!location) {
            setSearchMenu(ESearchMenu.LOCATION);
            return;
        }

        setSearchMenu(null);
    };
    return (
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
                <Heading as="h1" fontSize={'32px'} fontWeight={'600'} width={'full'} noOfLines={1}>
                    Xác nhận và thanh toán
                </Heading>
            </div>
            <div className="mx-auto px-20 flex items-stretch justify-start w-full flex-wrap  max-w-[1280px]  ">
                <div className="w-[50%] relative">
                    <VStack divider={<StackDivider borderColor="black.200" />} align="stretch" width={'full'}>
                        <Box pb={4}>
                            <Heading as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1} pb={8}>
                                Trải nghiệm của bạn
                            </Heading>
                            <div className="mr-6">
                                <Heading as="h3" fontSize={'16px'} fontWeight={'700'} width={'full'} noOfLines={1}>
                                    Ngày
                                </Heading>
                                <Text fontSize={'16px'} width={'full'} noOfLines={1} mt={2}>
                                    Th 7, 13 thg 5 14:00 - 16:30
                                </Text>
                            </div>
                            <div className="pt-4">
                                <Heading as="h3" fontSize={'16px'} fontWeight={'700'} width={'full'} noOfLines={1}>
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
                                            3 Khách
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
                                                        <h2 className="font-medium">Adults</h2>
                                                        <p className="text-sm leading-4 text-gray-300">Ages 13 or above</p>
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
                                                        <h2 className="font-medium">Children</h2>
                                                        <p className="text-sm leading-4 text-gray-300">Ages 2-12</p>
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
                                                        <h2 className="font-medium">Infants</h2>
                                                        <p className="text-sm leading-4 text-gray-300">Under 2</p>
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
                                <Heading as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1} mr={6} mb={1}>
                                    Thanh toán bằng
                                </Heading>
                                <div className="">
                                    <img
                                        src="htpps://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg"
                                        alt="Thẻ Visa"
                                        height="9"
                                        aria-hidden="true"
                                    ></img>
                                </div>
                            </div>
                            <div className="mr-6">
                                <Heading as="h3" fontSize={'16px'} fontWeight={'800'} width={'full'} noOfLines={1}>
                                    Ngày
                                </Heading>
                                <Text fontSize={'16px'} width={'full'} noOfLines={1} mt={2}>
                                    Th 7, 13 thg 5 14:00 - 16:30
                                </Text>
                            </div>
                        </Box>
                        <Box py={4}>
                            <Text fontSize={'12px'} pt={4} pb={8}>
                                Bằng việc chọn nút bên dưới, bạn đồng ý với Cam kết và miễn trừ của khách, Chính sách hủy, Chính sách hoàn
                                tiền cho khách và Hướng dẫn về giãn cách xã hội và các hướng dẫn khác liên quan đến COVID-19 của Airbnb.
                            </Text>
                            <Button size={'lg'} width={'50%'} py={7} colorScheme={'teal'}>
                                Xác nhận và thanh toán
                            </Button>
                        </Box>
                    </VStack>
                </div>
                <div className="w-[41.6667%] ml-[8.3333%] relative">
                    <CardPayment />
                </div>
            </div>
        </div>
    );
};

export default Payment;
