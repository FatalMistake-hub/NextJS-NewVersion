import { Skeleton, Stack } from '@chakra-ui/react';
import { FC, PropsWithChildren, useEffect, FocusEvent } from 'react';
import { FaChevronRight, FaSearchLocation } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectSearch, SET_LOCATION, SET_VIEWPORT } from 'src/redux/slice/searchSlice';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
interface ILocationProps extends PropsWithChildren<any> {
    status?: boolean;
    response: any;
    loading: boolean;
    onBlur: () => void;
}

const LocationWrapper: FC<ILocationProps> = ({ status, response, loading, onBlur }) => {
    const { location } = useAppSelector(selectSearch);
    const dispatch = useAppDispatch();
    return (
        <>
            {loading && location !== '' ? (
                <div className={`py-2 }`}>
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
                    {response?.data.features.map((data: any) => (
                        <span
                            key={data?.id}
                            className="flex w-[350px] px-4 py-3 rounded-2xl items-center center hover:bg-gray-100  "
                            onClick={() => {
                                dispatch(SET_LOCATION(`${data.properties.name} `));
                                dispatch(
                                    SET_VIEWPORT({
                                        northEastLongtitude: data.properties.bbox[0],
                                        northEastLatitude: data.properties.bbox[1],
                                        southWestLongtitude: data.properties.bbox[2],
                                        southWestLatitude: data.properties.bbox[3],
                                    }),
                                );
                                onBlur();
                            }}
                        >
                            <div className="flex items-center justify-center min-w-[48px] h-12 mr-4 bg-gray-200 rounded-md">
                                <FaSearchLocation className="w-6 h-6" />
                            </div>
                            <div className="flex items-center font-medium justify-center text-base text-left">
                                {data.properties.name}
                                {data.properties.place_formatted?.length > 9 ? ',' : ''} {data.properties.place_formatted?.slice(0, -8)}
                            </div>
                        </span>
                    ))}
                </div>
            ) : (
                <div className={`py-4 ${!!location && 'hidden'}`}>
                    <button className="flex justify-between w-[436px] px-6 py-4 border border-gray-200 rounded-full shadow-md text-primary">
                        <span className="font-bold">Nhập nơi bạn muốn đến</span> <FaChevronRight className="h-6" />
                    </button>
                </div>
            )}
        </>
    );
};

export default LocationWrapper;
