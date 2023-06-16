import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Box, Heading, StackDivider, VStack, Text, Button, Badge } from '@chakra-ui/react';

import { FC } from 'react';
import Image from 'next/image';
import Rating from '../Rating';
import { ITours } from 'src/types/tours.type';
import useGetDetailTour from 'src/hooks/guest/tours/useGetDetailTour';
import { numberToTime } from 'src/utils/dateUntils';
import { useAppSelector } from 'src/redux/hook';
import { selectSearch } from 'src/redux/slice/searchSlice';

enum ESearchMenu {
    LOCATION = 'location',
    CHECK_IN = 'checkIn',
    CHECK_OUT = 'checkOut',
    GUESTS = 'guests',
}
// type CardsPaymentProps = Pick<ITours, 'priceOnePerson' >;
interface CardsPaymentProps {
    // priceOnePerson: number | undefined;
    className?: string;
    tourId?: string | string[] | undefined;
}
const CardPayment: FC<CardsPaymentProps> = ({ className, tourId }) => {
    const { data, isLoading, isError, isSuccess } = useGetDetailTour(tourId);
    const { location, checkIn, checkOut, guests } = useAppSelector(selectSearch);

    return (
        <div className="sticky z-10 top-[130px] w-full inline-block pr-[1px]  border-slate-400 border-[1px] rounded-xl ">
            <VStack divider={<StackDivider borderColor="black.200" />} p={6} align="stretch" width={'full'}>
                <Box pb={4} w={'full'}>
                    <div className="pb-2 flex">
                        {data?.imageMain && (
                            <Image src={data?.imageMain} width={124} height={106} className="rounded-lg" blurDataURL={data?.imageMain} />
                        )}
                        <div className="flex flex-col items-start ml-4 justify-between">
                            <Text as={'span'} fontSize={'12px'}>
                                {data?.city} · {numberToTime(data?.timeSlotLength)}
                            </Text>
                            <div className="">
                                <Text as={'p'} fontSize={'14px'}>
                                    {data?.title}
                                    <Text as={'p'} fontSize={'14px'}>
                                        Được tổ chức bằng Tiếng Việt
                                    </Text>
                                </Text>
                            </div>
                            <Rating rating={4.5} avgRating={12} />
                        </div>
                    </div>
                </Box>
                <Box py={4}>
                    <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1}>
                        Chi tiết giá
                    </Heading>
                    <div className="mt-6 flex items-center justify-between">
                        <Text fontSize={'16px'}>
                            {data?.priceOnePerson && data.priceOnePerson.toLocaleString('vi-VN')}₫ x {guests.adults} người lớn
                        </Text>
                        <Text fontSize={'16px'}>
                            {' '}
                            {data?.priceOnePerson && (data.priceOnePerson * guests.adults).toLocaleString('vi-VN')}₫
                        </Text>
                    </div>
                    {guests.children > 0 && (
                        <div className="mt-6 flex items-center justify-between">
                            <Text fontSize={'16px'}>
                                {data?.priceOnePerson && ((data.priceOnePerson * 70) / 100).toLocaleString('vi-VN')}₫ x {guests.children}{' '}
                                trẻ em
                                <Badge colorScheme="green" px={2} rounded={'lg'} ml={4}>
                                    -30%
                                </Badge>
                            </Text>
                            <Text fontSize={'16px'}>
                                {' '}
                                {data?.priceOnePerson && ((data.priceOnePerson * guests.children * 70) / 100).toLocaleString('vi-VN')}₫
                            </Text>
                        </div>
                    )}

                    {guests.infants > 0 && (
                        <div className="mt-6 flex items-center justify-between">
                            <Text fontSize={'16px'}>
                                {data?.priceOnePerson && ((data.priceOnePerson * 50) / 100).toLocaleString('vi-VN')}₫ x {guests.infants} em
                                bé
                                <Badge colorScheme="green" px={2} rounded={'lg'} ml={4}>
                                    -50%
                                </Badge>
                            </Text>
                            <Text fontSize={'16px'}>
                                {' '}
                                {data?.priceOnePerson && ((data.priceOnePerson * guests.infants * 50) / 100).toLocaleString('vi-VN')}₫
                            </Text>
                        </div>
                    )}
                </Box>
                <Box py={4}>
                    <div className="flex items-center justify-between">
                        <Text fontSize={'16px'} fontWeight={'600'}>
                            Tổng (VND)
                        </Text>
                        <Text fontSize={'16px'} fontWeight={'600'}>
                            {data?.priceOnePerson &&
                                (
                                    data.priceOnePerson * guests.adults +
                                    (data.priceOnePerson * guests.children * 70) / 100 +
                                    (data.priceOnePerson * guests.infants * 50) / 100
                                ).toLocaleString('vi-VN')}
                            ₫
                        </Text>
                    </div>
                </Box>
                <Box py={4}>
                    <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1}>
                        Chính sách hủy
                    </Heading>

                    <Text fontSize={'16px'} mt={6}>
                        Được hoàn tiền đầy đủ nếu bạn hủy muộn nhất vào 14:00, 12 thg 5 (ICT). Tìm hiểu thêm
                    </Text>
                </Box>
            </VStack>
        </div>
    );
};

export default CardPayment;
