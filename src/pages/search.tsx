import React, { FC, ReactElement, useMemo, useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import { getSearch, searchResults } from 'src/utils/data';
import Image from 'next/image';
import { BiChevronLeft, BiChevronRight, BiClipboard, BiMap } from 'react-icons/bi';
import MapBase from '@components/Map/MapBase';
import { useRouter } from 'next/router';
import { useAppSelector } from 'src/redux/hook';
import { selectSearch } from 'src/redux/slice/searchSlice';
import { formatGuests } from 'src/utils/guestsUtil';
import { formatRangeDate } from 'src/utils/dateUntils';
import Link from 'next/link';
import CardItem from '@components/Card/CardItem';
import { Header } from '@components/layouts/common/Header';
import Footer from '@components/layouts/common/Footer';

const Search = () => {
    const router = useRouter();
    const [isFullMap, setIsFullMap] = useState<boolean>(false);
    const { location, checkIn, checkOut, guests } = useAppSelector(selectSearch);

    const getCenterMap = () => {
        const coords = searchResults.map((result) => ({
            latitude: result.lat,
            longitude: result.long,
        }));
        return getCenter(coords) || { latitude: 0, longitude: 0 };
    };

    const getGuests = (guests: any) => {
        const totalGuests = formatGuests(guests, { noInfants: true });
        if (totalGuests) return `• ${totalGuests}`;
    };

    const getDates = (startDate: any, endDate: any) => {
        const dates = formatRangeDate(startDate, endDate);
        if (dates) return `• ${dates}`;
    };

    return (
        <div className={`flex flex-col  ${isFullMap && 'overflow-hidden'}overflow-x-hidden `}>
            <main
                className={`${
                    !isFullMap && 'lg:grid-cols-[700px,1fr] xl:grid-cols-[840px,1fr]'
                } flex-grow grid grid-cols-1 duration-500 min-h-screen`}
            >
                {/* left - cards */}
                <div className={`${isFullMap && 'hidden'} px-6 pb-8 pt-[134px] duration-500`}>
                    {/* search data */}
                    <span className="inline-block mb-2 text-sm text-gray-400">
                        217 Stays {checkIn && getDates(checkIn, checkOut)} {guests && getGuests(guests)}
                    </span>
                    {/* title */}
                    <h1 className="mb-2 text-2xl font-semibold md:text-3xl lg:text-4xl lg:mb-7">Stays in {location}</h1>
                    {/* filters */}
                    <div className="mb-4 space-x-1 space-y-2 text-gray-400 md:space-x-2 lg:mb-8">
                        <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
                            Cancellation flexibility
                        </button>
                        <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
                            Type of place
                        </button>
                        <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
                            Price
                        </button>
                        <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
                            Instant Book
                        </button>
                        <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
                            Xem thêm filters
                        </button>
                    </div>
                    {/* information */}
                    <p className="mb-4 text-sm text-gray-400">
                        Review COVID-19 travel restrictions before you book.{' '}
                        <Link href="/">
                            <a className="underline">Learn more</a>
                        </Link>
                    </p>
                    {/* list */}
                    <section>
                        {/* {searchResults.map((result) => (
                            // <CardItem />
                        ))} */}
                    </section>
                </div>
                {/* right - maps */}
                <section
                    className={`block fixed left-0 right-0 bottom-0 top-0 sm:block sm:sticky top-[86px] h-map flex-grow bg-teal-900 bg-opacity-10   duration-100`}
                >
                    <MapBase center={getCenterMap()} className="relative top-[86px] ">
                        <button
                            className="absolute  top-1 items-center hidden p-3 m-4 text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-lg sm:flex active:scale-90"
                            onClick={() => (isFullMap ? setIsFullMap(false) : setIsFullMap(true))}
                        >
                            {isFullMap ? (
                                <>
                                    <BiChevronRight className="h-5" /> <span className="ml-2 text-sm font-semibold"> list</span>
                                </>
                            ) : (
                                <BiChevronLeft className="h-5" />
                            )}
                        </button>
                        {searchResults.map((result, index) => (
                            <Marker
                                key={`marker-${index}`}
                                latitude={result.lat}
                                longitude={result.long}
                                offsetLeft={-20}
                                offsetTop={-10}
                                // offset={[-20, -10]}
                            >
                                <button className="relative">
                                    <button className="px-3 py-1 font-bold duration-300 bg-white rounded-full shadow-md cursor-pointer focus:scale-90 peer">
                                        {result.price.split('/')[0]}
                                    </button>
                                    <div className="absolute z-10 hidden w-48 p-3 text-left bg-white border border-gray-200 rounded-lg cursor-pointer bottom-9 peer-focus:block">
                                        <div className="relative w-full h-24 mb-2">
                                            <Image
                                                src={result.img}
                                                alt={result.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-lg"
                                                placeholder="blur"
                                                blurDataURL={result.img}
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-semibold">{result.title}</h2>
                                        </div>
                                    </div>
                                </button>
                            </Marker>
                        ))}
                    </MapBase>
                </section>
            </main>
            {!isFullMap && <Footer />}
        </div>
    );
};

export const getServerSideProps = async () => {
    const searchResults = await getSearch();
    return {
        props: { searchResults },
    };
};
export default Search;
Search.getLayout = function (page: ReactElement) {
    return (
        <>
            <Header />
            {page}
        </>
    );
};
