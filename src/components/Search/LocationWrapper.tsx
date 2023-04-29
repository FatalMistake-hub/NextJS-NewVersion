import { FC, PropsWithChildren, useEffect, FocusEvent } from 'react';
import { FaChevronRight, FaSearchLocation } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectSearch, SET_LOCATION } from 'src/redux/slice/searchSlice';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
interface ILocationProps extends PropsWithChildren<any> {
    status?: string;
    response: google.maps.places.AutocompletePrediction[] | null;
    // onBlur: (event: FocusEvent<HTMLElement>) => void;
}

const LocationWrapper: FC<ILocationProps> = ({ status, response }) => {
    const { location } = useAppSelector(selectSearch);

    const dispatch = useAppDispatch();
    return (
        <>
            {location && response && status === 'OK' ? (
                <div className="py-2">
                    <h2 className="mb-4 text-xs font-bold">GO ANYWHERE, ANYTIME</h2>
                    {response.map(({ place_id, description }) => (
                        <span
                            key={place_id}
                            className="flex w-[400px] px-5 py-3 rounded-2xl items-center hover:bg-gray-100  "
                            onClick={() => dispatch(SET_LOCATION(description))}
                        >
                            <div className="flex items-center justify-center w-12 h-12 mr-4 bg-gray-200 rounded-md">
                                <FaSearchLocation className="w-6 h-6" />
                            </div>
                            <div className="flex items-center justify-center text-base text-left">{description}</div>
                        </span>
                    ))}
                </div>
            ) : (
                <div className="py-4">
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
