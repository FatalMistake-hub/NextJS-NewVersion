import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import React, { ChangeEvent, FC, FocusEvent, FormEvent, memo, useCallback, useEffect, useState } from 'react';
import Counter from './Counter';
import DateRangeCP from './DateRange';
import { FaChevronRight } from 'react-icons/fa';
import SearchOptionButton from './SearchOptionButton';
import SearchOptionWrapper from './SearchOptionWrapper';
import { formatRangeDate } from 'src/utils/dateUntils';
import { useDataContext } from 'src/hooks/useDataContext';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
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
    SET_LOCATION,
} from 'src/redux/slice/searchSlice';
import { formatGuests } from 'src/utils/guestsUtil';
import LocationWrapper from '../Wrapper/LocationWrapper';

import { EHeaderOpions } from 'src/utils/constants/Enums';
import useSearchLocation from 'src/hooks/map/useSearchLocation';
import useDebounce from 'src/hooks/useDebounced';

enum ESearchMenu {
    LOCATION = 'location',
    CHECK_IN = 'checkIn',
    CHECK_OUT = 'checkOut',
    GUESTS = 'guests',
}

interface ISearchBarProps {
    menu?: EHeaderOpions | null;
    isActiveHeader?: boolean;
    searchPage?: boolean;
    closeSearch?: () => void;
}

const Search: FC<ISearchBarProps> = ({ menu, isActiveHeader = true, closeSearch, searchPage }: any) => {
    const router = useRouter();
    const [searchMenu, setSearchMenu] = useState<ESearchMenu | null>(null);

    const { location, checkIn, checkOut, guests, viewport } = useAppSelector(selectSearch);
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

    const handleCloseSearch = useCallback(() => {
        closeSearch();
    }, [closeSearch]);
    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!location) {
            setSearchMenu(ESearchMenu.LOCATION);
            return;
        }
        if (searchPage) {
            handleCloseSearch();
        }
        setSearchMenu(null);

        router.push({
            pathname: '/search',
            query: {
                location,
                checkIn: `${checkIn}`,
                checkOut: `${checkOut}`,
                guests: JSON.stringify(guests),
                viewport: JSON.stringify(viewport),
            },
        });
    };


    const dateRangeStyle = 'left-2 right-2 searchbar:left-auto searchbar:right-1/2 searchbar:translate-x-1/2 searchbar:w-[950px]';

    const { data, isSuccess, isLoading, setSearchTerm } = useSearchLocation();
    return (
        <>
            <div className={`${isActiveHeader ? 'visible' : 'invisible'} px-4`}>
                <div
                    className={`${
                        !isActiveHeader && 'translate-y-[-75px] transform scale-50 opacity-0 z-[100]'
                    } max-w-[850px] mx-auto mt-2 rounded-2xl drop-shadow-2xl  bg-white border-2 border-[#008b8d] duration-300 hidden md:flex`}
                >
                    <form
                        action="/search"
                        className={' grid-cols-[0.8fr,0.7fr,0.7fr,auto] lg:grid-cols-[1fr,0.7fr,1fr] grid flex-grow  '}
                        onSubmit={handleOnSubmit}
                    >
                        {/* location */}
                        <SearchOptionButton
                            separator
                            relative
                            type="inputText"
                            title="Địa điểm"
                            placeholder="Tìm kiếm điểm đến"
                            active={searchMenu === ESearchMenu.LOCATION}
                            value={location}
                            onChange={(e) => {
                                dispatch(SET_LOCATION(e.target.value)), setSearchTerm(e.target.value);
                            }}
                            onFocus={() => setSearchMenu(ESearchMenu.LOCATION)}
                            onBlur={handleOnBlur}
                            onClear={() => {
                                dispatch(SET_LOCATION(''));
                                handleOnBlur();
                            }}
                        >
                            <SearchOptionWrapper className="left-0">
                                <LocationWrapper status={isSuccess} response={data} loading={isLoading} onBlur={handleOnBlur} />
                            </SearchOptionWrapper>
                        </SearchOptionButton>

                        <SearchOptionButton
                            // withSearch
                            separator
                            title="Ngày"
                            placeholder="Thêm ngày bạn muốn đi"
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
                            withSearch
                            title="Khách"
                            placeholder="Thêm khách bạn đi cùng"
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
        </>
    );
};

export default memo(Search);
