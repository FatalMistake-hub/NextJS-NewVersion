import SearchOptionWrapper from '@components/Search/SearchOptionWrapper';
import { FC, useState, FocusEvent, FormEvent } from 'react';
import SearchOptionButton from '@components/Search/SearchOptionButton';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Heading,
    Text,
    Button,
} from '@chakra-ui/react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
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
// Import Swiper React components
import { useAppSelector, useAppDispatch } from 'src/redux/hook';
import { DateTimeToStringBooking, formatRangeDate } from 'src/utils/dateUntils';
import DateRangeCP from '@components/Search/DateRange';
import Counter from '@components/Search/Counter';
import { formatGuests } from 'src/utils/guestsUtil';
import { BiUpload } from 'react-icons/bi';
import { useRouter } from 'next/router';
import useGetAllTimeBookingByRange from 'src/hooks/guest/timeBooking/useGetAllTimeBookingByRange';
import { time } from 'console';
import { IDayBook, TimeBookViewDtoList } from 'src/types/timeBooking.type';
import moment from 'moment';
interface AllDayModalProps {
    isOpen: boolean;
    onClose: () => void;
    price: number;
}
enum ESearchMenu {
    LOCATION = 'location',
    CHECK_IN = 'checkIn',
    CHECK_OUT = 'checkOut',
    GUESTS = 'guests',
}
const AllDayModal: FC<AllDayModalProps> = ({ isOpen, onClose, price }) => {
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

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!location) {
            setSearchMenu(ESearchMenu.LOCATION);
            return;
        }

        setSearchMenu(null);
    };

    const router = useRouter();
    const { id } = router.query;
    const { status, data, ref } = useGetAllTimeBookingByRange(
        moment(checkIn).format('YYYY-MM-DD'),
        moment(checkOut).format('YYYY-MM-DD'),
        2,
        id,
    );
    const dateRangeStyle = 'left-2 right-2 searchbar:left-auto searchbar:right-1/4 searchbar:translate-x-1/4 searchbar:w-[800px] ';

    const handleSelect = (time: any, day: any) => {
        router.push({
            pathname: '/payment',
            query: {
                tourId: `${id}`,
                checkIn: `${checkIn}`,
                checkOut: `${checkOut}`,
                guests: JSON.stringify(guests),
                timeId: JSON.stringify(time.timeId),
                start_time: `${time.start_time}`,
                end_time: `${time.end_time}`,
                day: `${day}`,
                priceOnePerson: `${price}`,
            },
        });
    };
    return (
        <>
            <Modal onClose={onClose} size={'full'} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton color={'black'} zIndex={'10'} />
                    <ModalBody pt={'30px'}>
                        <div className="w-full h-full ">
                            <div className="mx-auto px-20 flex items-stretch justify-start w-full flex-wrap pt-20 max-w-[1280px]   ">
                                <div className="w-[41.6667%] mr-[8.3333%] relative ">
                                    <div className="sticky top-[118px]">
                                        <Heading
                                            as="h3"
                                            fontSize={'26px'}
                                            fontWeight={'700'}
                                            width={'full'}
                                            noOfLines={1}
                                            mb={6}
                                            lineHeight={'32px'}
                                        >
                                            Chọn ngày
                                        </Heading>
                                        <div
                                            className={`min-h-[65px] mt-6 mb-4 min-w-fit rounded-xl bg-white border border-gray-300 duration-300 hidden md:flex`}
                                        >
                                            <form
                                                action="/search"
                                                className={'w-full grid-cols-[0.8fr,0.7fr,auto] lg:grid-cols-[1fr,0.7fr] grid flex-grow'}
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
                                                    value={formatGuests(guests)}
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
                                    </div>
                                </div>
                                <div className="w-[50%] relative">
                                    {data?.pages.map((page: any) =>
                                        page.data.content.map(
                                            (day: IDayBook) =>
                                                day.isDeleted === false &&
                                                day.timeBookDetailList.map(
                                                    (time: TimeBookViewDtoList) =>
                                                        time.isDeleted === false && (
                                                            <div key={time.timeId}>
                                                                <Heading
                                                                    as="h4"
                                                                    fontSize={'18px'}
                                                                    fontWeight={'600'}
                                                                    width={'full'}
                                                                    noOfLines={1}
                                                                    mb={4}
                                                                >
                                                                    {DateTimeToStringBooking(day.date_name)}
                                                                </Heading>
                                                                <div className="mb-4 border rounded-lg ">
                                                                    <div className="p-6 flex flex-col">
                                                                        <div className=" flex justify-between items-start  ">
                                                                            <div className="">
                                                                                <Text mb={1} fontSize={'16px'} color={'black.500'}>
                                                                                    {time.start_time?.slice(0, 5)}–
                                                                                    {time.end_time?.slice(0, 5)}
                                                                                </Text>
                                                                                <Text mb={4} fontSize={'16px'} fontWeight={600}>
                                                                                    Từ {price?.toLocaleString('vi-VN')}₫
                                                                                    <span className="font-normal">/người</span>
                                                                                </Text>
                                                                            </div>
                                                                            <Button
                                                                                colorScheme={'teal'}
                                                                                onClick={() => {
                                                                                    handleSelect(time, day.date_name);
                                                                                }}
                                                                            >
                                                                                Chọn
                                                                            </Button>
                                                                        </div>
                                                                        <Text mt={6} fontSize={'14px'} color={'black.500'}>
                                                                            Được tổ chức bằng Tiếng Anh, Tiếng Hàn Quốc và Tiếng Nhật Bản
                                                                        </Text>
                                                                    </div>
                                                                    <div className="pl-6 bg-gray-100 w-full py-2 px-1">
                                                                        <Button
                                                                            leftIcon={<BiUpload />}
                                                                            variant={'link'}
                                                                            color={'black'}
                                                                            fontWeight={400}
                                                                        >
                                                                            Chia sẻ
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ),
                                                ),
                                        ),
                                    )}
                                    <div ref={ref}></div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default AllDayModal;
