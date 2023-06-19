import { Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectSearch } from 'src/redux/slice/searchSlice';
import { TimeBookViewDtoList } from 'src/types/timeBooking.type';
import { DateTimeToStringBooking } from 'src/utils/dateUntils';

const CardSelectDay: FC<any> = ({ start_time, end_time, day, price, timeId }) => {
    const router = useRouter();
    const {  checkIn, checkOut, guests } = useAppSelector(selectSearch)
    const handleSelect = () => {
        router.push({
            pathname: '/payment',
            query: {
                tourId: `${router.query.id}`,
                checkIn: `${checkIn}`,
                checkOut: `${checkOut}`,
                guests: JSON.stringify(guests),
                timeId: JSON.stringify(timeId),
                start_time: `${start_time}`,
                end_time: `${end_time}`,
                day: `${day}`,
                priceOnePerson: `${price}`,
            },
        });

    };
   
    return (
        <div className="p-6 drop-shadow-sm flex items-start justify-center  flex-col border rounded-lg border-black-400 min-w-[200px]">
            <div className="flex flex-col items-start ">
                <Text mb={1} fontSize={'16px'} fontWeight={600}>
                    {DateTimeToStringBooking(day)}
                </Text>
                <Text mb={1} fontSize={'12px'} color={'black.500'}>
                    {start_time?.slice(0, 5)}–{end_time?.slice(0, 5)}
                </Text>
            </div>
            <div className="flex flex-col items-start">
                <Text mb={4} mt={8} fontSize={'16px'} fontWeight={600}>
                    Từ {price?.toLocaleString('vi-VN')}₫<span className="font-normal">/người</span>
                </Text>
                <Button
                    size={'sm'}
                    colorScheme="teal"
                    onClick={() => {
                        handleSelect();
                    }}
                >
                    Chọn
                </Button>
            </div>
        </div>
    );
};

export default CardSelectDay;

