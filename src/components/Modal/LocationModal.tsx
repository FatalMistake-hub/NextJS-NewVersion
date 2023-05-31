import { Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, Box } from '@chakra-ui/react';
import MapLocation from '@components/Map/MapLocation';
import SearchOptionButton from '@components/Search/SearchOptionButton';
import SearchOptionWrapper from '@components/Search/SearchOptionWrapper';
import AddressWrapper from '@components/Wrapper/AddressWrapper';
import TourFormWrapper from '@components/Wrapper/TourFormWrapper';
import { Marker } from 'mapbox-gl';

import { BsGeoAltFill } from 'react-icons/bs';
import useAddressLocation from 'src/hooks/map/useSearchAddress';
import { SET_DESTINATION } from 'src/redux/slice/becomeHostSlice';

import React, { ChangeEvent, FC, FocusEvent, FormEvent, useEffect, useState } from 'react';
enum ESearchMenu {
    LOCATION = 'location',
    CHECK_IN = 'checkIn',
    CHECK_OUT = 'checkOut',
    GUESTS = 'guests',
}
const LocationModal = ({ onClose, isOpen }: any) => {
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

    const [searchMenu, setSearchMenu] = useState<ESearchMenu | null>(null);
    return (
        <Modal onClose={onClose} size={'5xl'} isOpen={isOpen} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader pt={8} pl={8}>Khách đăng ký trải nghiệm có thể gặp bạn tại đâu?</ModalHeader>
                <ModalCloseButton />
                <ModalBody minW={'700px'} pb={6} px={4}>
                    <TourFormWrapper>
                        <Box w={'full'} h={'70vh'} position={'relative'}>
                            <MapLocation>
                                {/* {tour.destination && (
                                    <Marker
                                        latitude={tour.latitude}
                                        longitude={tour.longitude}
                                        // offsetLeft={-20}
                                        // offsetTop={-10}
                                        // offset={[-20, -10]}
                                    >
                                        <BsGeoAltFill
                                            style={{ zIndex: 10 }}
                                            size={'2rem'}
                                            className=" text-[#3d9d9b] absolute top-0 right-1"
                                        />
                                    </Marker>
                                )} */}
                            </MapLocation>
                            <div className="w-[500px] absolute top-14 left-[24%] min-h-[64px]">
                                <SearchOptionButton
                                    separator
                                    relative
                                    type="inputText"
                                    title="Địa chỉ"
                                    placeholder="Nhập địa chỉ của bạn"
                                    active={searchMenu === ESearchMenu.LOCATION}
                                    value={'tour.destination'}
                                    onChange={(e) => {
                                        // dispatch(SET_DESTINATION(e.target.value)), setAddressTerm(e.target.value);
                                    }}
                                    onFocus={() => setSearchMenu(ESearchMenu.LOCATION)}
                                    // onBlur={handleOnBlur}
                                    onClear={() => {
                                        // dispatch(SET_DESTINATION(''));
                                        handleOnBlur();
                                    }}
                                >
                                    <SearchOptionWrapper className="left-[-24px]">
                                        <AddressWrapper status={isSuccess} response={data} loading={isLoading} onBlur={handleOnBlur} />
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

export default LocationModal;
