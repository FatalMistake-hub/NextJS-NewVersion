import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Box, Heading, StackDivider, VStack, Text, Button } from '@chakra-ui/react';

import { FC } from 'react';
import Image from 'next/image';
import Rating from '../Rating';

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
}
const CardPayment: FC<CardsPaymentProps> = ({ className }) => {
    return (
        <div className="sticky z-10 top-[130px] w-full inline-block pr-[1px]  border-slate-400 border-[1px] rounded-xl ">
            <VStack divider={<StackDivider borderColor="black.200" />} p={6} align="stretch" width={'full'}>
                <Box pb={4} w={'full'}>
                    <div className="pb-2 flex">
                        <Image
                            src="https://a0.muscache.com/im/pictures/lombard/MtTemplate-1340671-media_library/original/5dcf4701-0837-42d3-ac9d-b03815a8d0be.jpg?im_w=720"
                            width={124}
                            height={106}
                            className="rounded-lg"
                        />
                        <div className="flex flex-col items-start ml-4 justify-between">
                            <Text as={'span'} fontSize={'12px'}>
                                Thành phố Hội An · 2,5 giờ
                            </Text>
                            <div className="">
                                <Text as={'p'} fontSize={'14px'}>
                                    Hoi An Heritage Guided Tour
                                    <Text as={'p'} fontSize={'14px'}>
                                        Được tổ chức bằng Tiếng Anh
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
                        <Text fontSize={'16px'}>$22,25 x 3 người lớn</Text>
                        <Text fontSize={'16px'}>$66,75</Text>
                    </div>
                </Box>
                <Box py={4}>
                    <div className="flex items-center justify-between">
                        <Text fontSize={'16px'} fontWeight={'600'}>
                            Tổng (VND)
                        </Text>
                        <Text fontSize={'16px'} fontWeight={'600'}>
                            $66,75
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
