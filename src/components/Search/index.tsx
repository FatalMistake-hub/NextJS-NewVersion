import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import React, { FC, FocusEvent, FormEvent, useState } from 'react';

import Counter from './Counter';
import { DATA_ACTION_TYPES } from 'src/context/actionTypes';
import DateRangeCP from './DateRange';
import { EHeaderOpions } from 'src/types';
import { FaChevronRight } from 'react-icons/fa';
import SearchOptionButton from './SearchOptionButton';
import SearchOptionWrapper from './SearchOptionWrapper';
import { formatRangeDate } from 'src/utils/dateUntils';
import { useDataContext } from 'src/hooks/useDataContext';
import { useRouter } from 'next/router';

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
    // data
    const [{ location, checkIn, checkOut, guests }, dispatch] = useDataContext();
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

    const resetDate = () => {
        dispatch({
            type: DATA_ACTION_TYPES.RESET_DATES,
        });
        handleOnBlur();
    };

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!location) {
            setSearchMenu(ESearchMenu.LOCATION);
            return;
        }
        if (searchPage) {
            closeSearch();
        }
        setSearchMenu(null);

        // router.push({
        //     pathname: '/search',
        //     query: {
        //         location,
        //         checkIn: checkIn?.toISOString(),
        //         checkOut: checkOut?.toISOString(),
        //         guests: JSON.stringify(guests),
        //     },
        // });
    };

    const dateRangeStyle = 'left-4 right-4 searchbar:left-auto searchbar:right-1/2 searchbar:translate-x-1/2 searchbar:w-[850px]';

    return (
        <>
            <div className={`${isActiveHeader ? 'visible' : 'invisible'} px-4`}>
                <div
                    className={`${
                        !isActiveHeader && 'translate-y-[-75px] transform scale-50 opacity-0 z-[100]'
                    } max-w-[850px] mx-auto mt-2 rounded-full bg-white border border-gray-200 duration-300 hidden md:flex`}
                >
                    <form
                        action="/search"
                        className={' grid-cols-[0.8fr,0.7fr,0.7fr,auto] lg:grid-cols-[1fr,0.7fr,0.7fr,auto] grid flex-grow'}
                        onSubmit={handleOnSubmit}
                    >
                        {/* location */}
                        <SearchOptionButton
                            separator
                            relative
                            type="inputText"
                            title="Location"
                            placeholder="Where are you going?"
                            active={searchMenu === ESearchMenu.LOCATION}
                            value={0}
                            onChange={() => {}}
                            onFocus={() => setSearchMenu(ESearchMenu.LOCATION)}
                            onBlur={handleOnBlur}
                            onClear={() => {}}
                        >
                            <SearchOptionWrapper className="left-0">
                                <div className="py-4">
                                    <h2 className="mb-4 text-xs font-bold">GO ANYWHERE, ANYTIME</h2>
                                    <button className="flex justify-between w-[436px] px-6 py-4 border border-gray-200 rounded-full shadow-md text-primary">
                                        <span className="font-bold">I&apos;m flexible</span> <FaChevronRight className="h-6" />
                                    </button>
                                </div>
                            </SearchOptionWrapper>
                        </SearchOptionButton>

                        <SearchOptionButton
                            // withSearch
                            title="Date"
                            placeholder="Add when you want to go"
                            active={searchMenu === ESearchMenu.GUESTS}
                            value={formatRangeDate(1, 2)}
                            onFocus={() => setSearchMenu(ESearchMenu.GUESTS)}
                            onBlur={handleOnBlur}
                            onClear={resetDate}
                            isSearch={!!searchMenu}
                        >
                            {/* date picker */}
                            <SearchOptionWrapper className={dateRangeStyle}>
                                {searchMenu === ESearchMenu.GUESTS && <DateRangeCP />}
                            </SearchOptionWrapper>
                        </SearchOptionButton>
                        <SearchOptionButton
                            relative
                            withSearch
                            title="Guests"
                            placeholder="Add guests"
                            active={searchMenu === ESearchMenu.GUESTS}
                            value={1}
                            onFocus={() => setSearchMenu(ESearchMenu.GUESTS)}
                            onBlur={handleOnBlur}
                            onClear={() => {
                                // dispatch({ type: DATA_ACTION_TYPES.RESET_GUESTS });
                                handleOnBlur();
                            }}
                            isSearch={!!searchMenu}
                            onSearch={() => setSearchMenu(ESearchMenu.LOCATION)}
                        >
                            <SearchOptionWrapper className="right-0 w-96">
                                <div>
                                    <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                        <div className="flex-grow">
                                            <h2 className="font-medium">Adults</h2>
                                            <p className="text-sm leading-4 text-gray-300">Ages 13 or above</p>
                                        </div>
                                        <Counter value={0} maxValue={16} onIncrease={() => {}} onDescrease={() => {}} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                        <div className="flex-grow">
                                            <h2 className="font-medium">Children</h2>
                                            <p className="text-sm leading-4 text-gray-300">Ages 2-12</p>
                                        </div>
                                        <Counter value={0} maxValue={16} onIncrease={() => {}} onDescrease={() => {}} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex py-4">
                                        <div className="flex-grow">
                                            <h2 className="font-medium">Infants</h2>
                                            <p className="text-sm leading-4 text-gray-300">Under 2</p>
                                        </div>
                                        <Counter value={0} maxValue={16} onIncrease={() => {}} onDescrease={() => {}} />
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

export default Search;
