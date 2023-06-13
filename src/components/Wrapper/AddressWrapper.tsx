import { Skeleton, Stack } from '@chakra-ui/react';
import { FC, PropsWithChildren, useEffect, FocusEvent, memo } from 'react';
import { FaChevronRight, FaSearchLocation } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectBecomeHost, SET_CITY, SET_COORDINATE, SET_DESTINATION } from 'src/redux/slice/becomeHostSlice';


import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
interface ILocationProps extends PropsWithChildren<any> {
    status?: boolean;
    response: any;
    loading: boolean;
    className?: string;
    onBlur: () => void;
}

const AddressWrapper: FC<ILocationProps> = ({ className, status, response, loading, onBlur }) => {
    const { tour } = useAppSelector(selectBecomeHost);
    const dispatch = useAppDispatch();
    return (
        <>
            {(loading && tour.destination !== '') || (!response?.data.features[0] && tour.destination !== '') ? (
                <div className={`py-2 `}>
                    <Stack spacing="12px" className="w-[500px]  px-4 py-3">
                        <Skeleton borderRadius={'8px'} height="48px" />
                        <Skeleton borderRadius={'8px'} height="48px" />
                        <Skeleton borderRadius={'8px'} height="48px" />
                        <Skeleton borderRadius={'8px'} height="48px" />
                        <Skeleton borderRadius={'8px'} height="48px" />
                    </Stack>
                </div>
            ) : null}
            {tour.destination && response && !loading && status ? (
                <div className={`py-2  ${response?.data.features[0] ? '' : 'hidden'}`}>
                    {(response?.data.features).splice(0, 5).map((data: any, index: any) => (
                        <button
                            key={index}
                            className="flex w-[500px] px-4 py-3 rounded-2xl items-center hover:bg-gray-100  "
                            onClick={() => {
                                dispatch(
                                    SET_DESTINATION(
                                        `${data.properties.name}, ${data.properties.city}, ${data.properties.district}, ${data.properties.state} `,
                                    ),
                                );
                                dispatch(
                                    SET_COORDINATE({
                                        longitude: data.geometry.coordinates[0],
                                        latitude: data.geometry.coordinates[1],
                                    }),
                                );
                                dispatch(SET_CITY(data.properties.state));
                                
                                onBlur();
                            }}
                        >
                            <div className="flex items-center justify-center min-w-[48px] h-12 mr-4 bg-gray-200 rounded-md">
                                <FaSearchLocation className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <p className="flex text-base  font-medium items-center justify-start text-base text-left">
                                    {data.properties.name}
                                </p>
                                <p className="flex text-sm items-center justify-start text-base text-left">
                                    {data.properties.city}, {data.properties.district}, {data.properties.state}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className={`py-2 ${!!tour.destination && 'hidden'}`}>
                    <button className="flex justify-between w-[500px] px-6 py-4 border border-gray-200 rounded-full shadow-md text-primary">
                        <span className="font-bold text-sm">Nhập địa chỉ .........</span> <FaChevronRight className="h-6" />
                    </button>
                </div>
            )}
        </>
    );
};

export default memo(AddressWrapper);
