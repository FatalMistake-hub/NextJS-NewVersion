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
    className?: string;
    onBlur: () => void;
}

const AddressWrapper: FC<ILocationProps> = ({ className, status, response, loading, onBlur }) => {
    const { location } = useAppSelector(selectSearch);
    const dispatch = useAppDispatch();
    return (
        <div className={className}>
            {loading && location !== '' ? (
                <div className={`py-2 `}>
                    <Stack spacing="12px" className="w-[450px]  px-4 py-3">
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
                            className="flex w-[450px] px-4 py-3 rounded-2xl items-center hover:bg-gray-100  "
                            onClick={() => {
                                dispatch(SET_LOCATION(`${data.properties.name} `)), onBlur();
                            }}
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
                <div className={`py-2 ${!!location && 'hidden'}`}>
                    <button className="flex justify-between w-[450px] px-6 py-4 border border-gray-200 rounded-full shadow-md text-primary">
                        <span className="font-bold text-sm">Nhập địa chỉ .........</span> <FaChevronRight className="h-6" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddressWrapper;
