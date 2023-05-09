import { Skeleton, Stack } from '@chakra-ui/react';
import { FC, PropsWithChildren, useEffect, FocusEvent } from 'react';
import { FaChevronRight, FaSearchLocation } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectSearch, SET_LOCATION } from 'src/redux/slice/searchSlice';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
interface ILocationProps extends PropsWithChildren<any> {
    status?: boolean;
    response: any;
    loading: boolean;
    // onBlur: (event: FocusEvent<HTMLElement>) => void;
}

const LocationWrapper: FC<ILocationProps> = ({ status, response, loading }) => {
    const { location } = useAppSelector(selectSearch);
    const dispatch = useAppDispatch();
    return (
        <>
            {loading && location !== '' ? (
                <div className={`py-2 }`}>
                    <h2 className="mb-4 text-xs px-4 font-bold">GO ANYWHERE, ANYTIME</h2>
                    <Stack spacing="12px" className="w-[350px]  px-4 py-3">
                        <Skeleton borderRadius={'8px'} height="48px" />
                        <Skeleton borderRadius={'8px'} height="48px" />
                        <Skeleton borderRadius={'8px'} height="48px" />
                        <Skeleton borderRadius={'8px'} height="48px" />
                        <Skeleton borderRadius={'8px'} height="48px" />
                    </Stack>
                </div>
            ) : null}
            {location && response && !loading && status ? (
                <div className={`py-2 }`}>
                    <h2 className="mb-4 text-xs px-4 font-bold">GO ANYWHERE, ANYTIME</h2>
                    {response?.data.features.map((data: any) => (
                        <span
                            key={data?.id}
                            className="flex w-[350px] px-4 py-3 rounded-2xl items-center hover:bg-gray-100  "
                            onClick={() => dispatch(SET_LOCATION(`${data.properties.name} `))}
                        >
                            <div className="flex items-center justify-center min-w-[48px] h-12 mr-4 bg-gray-200 rounded-md">
                                <FaSearchLocation className="w-6 h-6" />
                            </div>
                            <div className="flex items-center justify-center text-base text-left">
                                {data.properties.name}
                                {/* {data.properties.place_formatted} */}
                            </div>
                        </span>
                    ))}
                </div>
            ) : (
                <div className={`py-4 ${!!location && 'hidden'}`}>
                    <h2 className="mb-4 text-xs font-bold">GO ANYWHERE, ANYTIME</h2>
                    <button className="flex justify-between w-[436px] px-6 py-4 border border-gray-200 rounded-full shadow-md text-primary">
                        <span className="font-bold">I&apos;m flexible</span> <FaChevronRight className="h-6" />
                    </button>
                </div>
            )}
        </>
    );
};

export default LocationWrapper;
