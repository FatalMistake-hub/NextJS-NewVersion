import { Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, Box, Skeleton, Stack } from '@chakra-ui/react';
import MapLocation from '@components/Map/MapLocation';
import SearchOptionButton from '@components/Search/SearchOptionButton';
import SearchOptionWrapper from '@components/Search/SearchOptionWrapper';

import TourFormWrapper from '@components/Wrapper/TourFormWrapper';
import { Marker } from 'react-map-gl';

import { BsGeoAltFill } from 'react-icons/bs';
import useAddressLocation from 'src/hooks/map/useSearchAddress';

import React, { ChangeEvent, FC, FocusEvent, FormEvent, memo, useEffect, useState } from 'react';
import { ITours } from 'src/types/tours.type';

import { FaSearchLocation, FaChevronRight } from 'react-icons/fa';
enum ESearchMenu {
    LOCATION = 'location',
    CHECK_IN = 'checkIn',
    CHECK_OUT = 'checkOut',
    GUESTS = 'guests',
}
type Props = {
    isOpen: boolean;
    onClose: () => void;
    value: Partial<ITours>;
};
const LocationModal = ({ onClose, isOpen, value }: Props) => {
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
    const { data, isSuccess, isLoading, setAddressTerm } = useAddressLocation();
    const [tour, setTour] = useState<Partial<ITours>>({
        latitude: value.latitude,
        longitude: value.longitude,
        city: value.city,
        destination: value.destination,
    });
    const [searchMenu, setSearchMenu] = useState<ESearchMenu | null>(null);
    return (
        <Modal onClose={onClose} size={'5xl'} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader pt={8} pl={8}>
                    Khách đăng ký trải nghiệm có thể gặp bạn tại đâu?
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody minW={'700px'} pb={6} px={4}>
                    <TourFormWrapper tourId={`${value.tourId}`} value={tour}>
                        <Box w={'full'} h={'70vh'} position={'relative'}>
                            <MapLocation latitude={Number(tour.latitude)} longitude={Number(tour.longitude)}>
                                <Marker latitude={Number(tour.latitude)} longitude={Number(tour.longitude)}>
                                    <BsGeoAltFill style={{ zIndex: 10 }} size={'2rem'} className=" text-[#3d9d9b] absolute top-0 right-1" />
                                </Marker>
                            </MapLocation>
                            <div className="w-[500px] absolute top-14 left-[24%] min-h-[64px]">
                                <SearchOptionButton
                                    separator
                                    relative
                                    type="inputText"
                                    title="Địa chỉ"
                                    placeholder="Nhập địa chỉ của bạn"
                                    active={searchMenu === ESearchMenu.LOCATION}
                                    value={tour.destination}
                                    onChange={(e) => {
                                        setTour((prev) => {
                                            return { ...prev, destination: e.target.value };
                                        }),
                                            setAddressTerm(e.target.value);
                                    }}
                                    onFocus={() => setSearchMenu(ESearchMenu.LOCATION)}
                                    // onBlur={handleOnBlur}
                                    onClear={() => {
                                        // dispatch(SET_DESTINATION(''));
                                        setTour((prev) => {
                                            return { ...prev, destination: '' };
                                        });
                                        handleOnBlur();
                                    }}
                                >
                                    <SearchOptionWrapper className="left-[-24px]">
                                        {/* <AddressWrapper status={isSuccess} response={data} loading={isLoading} onBlur={handleOnBlur} /> */}
                                        <>
                                            {(isLoading && tour.destination !== '') ||
                                            (!data?.data.features[0] && tour.destination !== '') ? (
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
                                            {tour.destination && data && !isLoading && isSuccess ? (
                                                <div className={`py-2  ${data?.data.features[0] ? '' : 'hidden'}`}>
                                                    {(data?.data.features).splice(0, 5).map((data: any) => (
                                                        <button
                                                            key={data?.id}
                                                            className="flex w-[500px] px-4 py-3 rounded-2xl items-center hover:bg-gray-100  "
                                                            onClick={() => {
                                                                setTour((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        destination: `${data.properties.name}, ${data.properties.city}, ${data.properties.district}, ${data.properties.state} `,
                                                                        longitude: `${data.geometry.coordinates[0]}`,
                                                                        latitude: `${data.geometry.coordinates[1]}`,
                                                                        city: data.properties.state,
                                                                    };
                                                                });
                                                                handleOnBlur();
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
                                                                    {data.properties.city}, {data.properties.district},{' '}
                                                                    {data.properties.state}
                                                                </p>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className={`py-2 ${!!tour.destination && 'hidden'}`}>
                                                    <button className="flex justify-between w-[500px] px-6 py-4 border border-gray-200 rounded-full shadow-md text-primary">
                                                        <span className="font-bold text-sm">Nhập địa chỉ .........</span>{' '}
                                                        <FaChevronRight className="h-6" />
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    </SearchOptionWrapper>
                                </SearchOptionButton>
                            </div>
                        </Box>
                    </TourFormWrapper>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default memo(LocationModal);
