import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Box, Heading, StackDivider, VStack, Text, Button } from '@chakra-ui/react';
import SearchOptionWrapper from '@components/Search/SearchOptionWrapper';
import { FC, useState, FocusEvent, FormEvent } from 'react';
import SearchOptionButton from '@components/Search/SearchOptionButton';
import {
    DECREASE_ADULTS,
    DECREASE_CHILDREN,
    DECREASE_INFANTS,
    INCREASE_ADULTS,
    INCREASE_CHILDREN,
    INCREASE_INFANTS,
    RESET_DATES,
    RESET_GUESTS,
    selectSearch,
} from 'src/redux/slice/searchSlice';
import { useAppSelector, useAppDispatch } from 'src/redux/hook';
import { DateTimeToStringBooking, formatRangeDate } from 'src/utils/dateUntils';
import DateRangeCP from '@components/Search/DateRange';
import Counter from '@components/Search/Counter';
import { formatGuests, formatGuestsMinimal } from 'src/utils/guestsUtil';
import { useRouter } from 'next/navigation';
enum ESearchMenu {
    LOCATION = 'location',
    CHECK_IN = 'checkIn',
    CHECK_OUT = 'checkOut',
    GUESTS = 'guests',
}
// type CardsBookingProps = Pick<ITours, 'priceOnePerson' >;
interface CardsBookingProps {
    priceOnePerson: number | undefined;
    tourId: number | undefined;
    dataTimeBooking: any;
    onOpen: () => void;
}
const CardBooking: FC<CardsBookingProps> = ({ priceOnePerson, tourId, dataTimeBooking, onOpen }) => {
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

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!location) {
            setSearchMenu(ESearchMenu.LOCATION);
            return;
        }

        setSearchMenu(null);
    };

    const handleSelect = (time: any) => {
        router.push({
            pathname: '/payment',
            query: {
                tourId: `${tourId}`,
                checkIn: `${checkIn}`,
                checkOut: `${checkOut}`,
                guests: JSON.stringify(guests),
                timeId: JSON.stringify(time.timeId),
                start_time: `${time.start_time}`,
                end_time: `${time.end_time}`,
                day: `${time.day}`,
                priceOnePerson: `${priceOnePerson}`,
            },
        });
    };
    const dateRangeStyle = 'left-2 right-2 searchbar:left-auto searchbar:right-1/2 searchbar:translate-x-1/4 searchbar:w-[850px] ';
    return (
        <div className="sticky z-10 top-[130px] w-full inline-block pr-[1px] my-12 border-slate-400 border-[1px] rounded-xl shadow-xl">
            <VStack divider={<StackDivider borderColor="black.200" />} p={6} align="stretch" width={'full'}>
                <Box>
                    <div className="flex justify-between items-center">
                        <section>
                            <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={1}>
                                Từ {priceOnePerson?.toLocaleString('vi-VN')}₫<span className="text-base font-normal ">/người</span>
                            </Heading>
                            {/* <Text className="text-base font-normal underline text-gray-300 hover:text-gray-400 ">Hiển thị tất cả giá</Text> */}
                        </section>
                    </div>
                    <div
                        className={`min-h-[65px] mt-6 mb-4 min-w-full rounded-xl bg-white border border-gray-300 duration-300 hidden md:flex`}
                    >
                        <form
                            action="/search"
                            className={'max-w-full  lg:grid-cols-[1fr,1fr,auto] grid flex-grow'}
                            onSubmit={handleOnSubmit}
                        >
                            <SearchOptionButton
                                // withSearch
                                separator
                                title="Ngày "
                                placeholder="Thêm ngày"
                                active={searchMenu === ESearchMenu.CHECK_OUT}
                                value={formatRangeDate(checkIn, checkOut)}
                                onFocus={() => setSearchMenu(ESearchMenu.CHECK_OUT)}
                                onBlur={handleOnBlur}
                                onClear={() => {
                                    dispatch(RESET_DATES(null));
                                    handleOnBlur();
                                }}
                                isSearch={!!searchMenu}
                            >
                                {/* date picker */}
                                <SearchOptionWrapper className={dateRangeStyle}>
                                    {searchMenu === ESearchMenu.CHECK_OUT && <DateRangeCP />}
                                </SearchOptionWrapper>
                            </SearchOptionButton>
                            <SearchOptionButton
                                relative
                                title="Khách"
                                placeholder="Thêm khách"
                                active={searchMenu === ESearchMenu.GUESTS}
                                value={formatGuestsMinimal(guests)}
                                onFocus={() => setSearchMenu(ESearchMenu.GUESTS)}
                                onBlur={handleOnBlur}
                                onClear={() => {
                                    dispatch(RESET_GUESTS(0));

                                    handleOnBlur();
                                }}
                                isSearch={!!searchMenu}
                                onSearch={() => setSearchMenu(ESearchMenu.LOCATION)}
                            >
                                <SearchOptionWrapper className="right-0 w-96">
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
                                </SearchOptionWrapper>
                            </SearchOptionButton>
                        </form>
                    </div>
                    <VStack divider={<StackDivider borderColor="black.200" />} align="stretch" width={'full'}>
                        {dataTimeBooking.slice(0, 3).map((time: any) => (
                            <div key={time?.timeId} className="py-6 flex items-start justify-between w-full">
                                <div>
                                    <Text mb={1} fontSize={'14px'} fontWeight={600}>
                                        {DateTimeToStringBooking(time?.day)}
                                    </Text>
                                    <Text mb={1} fontSize={'12px'} color={'black.500'}>
                                        {time?.start_time.slice(0, 5)}–{time?.end_time.slice(0, 5)}
                                    </Text>
                                </div>
                                <div className="flex flex-col items-end">
                                    <Text mb={2} fontSize={'14px'} fontWeight={600}>
                                        Từ {priceOnePerson?.toLocaleString('vi-VN')}₫<span className="font-normal">/người</span>
                                    </Text>
                                    <Button size={'sm'} colorScheme="teal" onClick={() => handleSelect(time)}>
                                        Chọn
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </VStack>
                </Box>

                <Box>
                    <Button
                        border={'1px solid #000000'}
                        borderRadius={'8px'}
                        color={'black'}
                        height={'48px'}
                        display={'flex'}
                        colorScheme={'white'}
                        className="hover:bg-gray-100 cursor-pointer"
                        width={'100%'}
                        mt={6}
                        onClick={onOpen}
                    >
                        <Text className="text-base break-words font-semibold  w-full  h-full py-3  text-center flex items-center justify-center">
                            Hiển thị các ngày khác
                        </Text>
                    </Button>
                </Box>
            </VStack>
        </div>
    );
};

export default CardBooking;
