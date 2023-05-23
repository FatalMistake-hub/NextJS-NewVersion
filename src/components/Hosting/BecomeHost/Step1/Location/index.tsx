import { Box, VStack, Text, Heading } from '@chakra-ui/react';
import MapBase from '@components/Map/MapBase';
import MapLocation from '@components/Map/MapLocation';
import SearchOptionButton from '@components/Search/SearchOptionButton';
import SearchOptionWrapper from '@components/Search/SearchOptionWrapper';
import AddressWrapper from '@components/Wrapper/AddressWrapper';
import LocationWrapper from '@components/Wrapper/LocationWrapper';
import React, { ChangeEvent, FC, FocusEvent, FormEvent, useMemo, useState } from 'react';
import { BsGeoAltFill } from 'react-icons/bs';
import { FaSearchLocation } from 'react-icons/fa';
import { Marker } from 'react-map-gl';
import useAddressLocation from 'src/hooks/map/useSearchAddress';

import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectBecomeHost, SET_btnSTATUS, SET_COORDINATE, SET_DESTINATION } from 'src/redux/slice/becomeHostSlice';
enum ESearchMenu {
    LOCATION = 'location',
    CHECK_IN = 'checkIn',
    CHECK_OUT = 'checkOut',
    GUESTS = 'guests',
}

const LocationSt1 = () => {
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
    const { tour } = useAppSelector(selectBecomeHost);

    const dispatch = useAppDispatch();
    const [searchMenu, setSearchMenu] = useState<ESearchMenu | null>(null);
    useMemo(() => {
        if (tour.destination === '' || tour.latitude === 18.0583 || tour.longitude === 107.20623) {
            dispatch(SET_btnSTATUS(true));
        } else {
            dispatch(SET_btnSTATUS(false));
            
        }
    }, [tour.destination, tour.latitude, tour.longitude]);
    return (
        <>
            <div className="w-full justify-center  flex min-h-[calc(100vh-176px)] px-20">
                <VStack w={'1280px'} align={'left'} gap={1} mt={8}>
                    <Heading
                        lineHeight={'54px'}
                        as="h1"
                        fontSize={'32px'}
                        fontWeight={'600'}
                        width={'full'}
                        noOfLines={2}
                        letterSpacing={'tight'}
                    >
                        Khách đăng ký trải nghiệm có thể gặp bạn tại đâu?
                    </Heading>
                    <Text fontSize={'18px'} fontWeight={'400'}>
                        Địa chỉ được chia sẻ với khách sau khi họ đặt trải nghiệm thành công.
                    </Text>
                    <Box pb={12} pt={8} w={'full'} h={'full'} position={'relative'}>
                        <MapLocation>
                            {tour.destination && (
                                <Marker
                                    latitude={tour.latitude}
                                    longitude={tour.longitude}
                                    // offsetLeft={-20}
                                    // offsetTop={-10}
                                    // offset={[-20, -10]}
                                >
                                    <BsGeoAltFill style={{ zIndex: 10 }} size={'2rem'} className=" text-[#3d9d9b] absolute top-0 right-1" />
                                </Marker>
                            )}
                        </MapLocation>
                        <div className="w-[500px] absolute top-14 left-[32%] min-h-[64px]">
                            <SearchOptionButton
                                separator
                                relative
                                type="inputText"
                                title="Địa chỉ"
                                placeholder="Nhập địa chỉ của bạn"
                                active={searchMenu === ESearchMenu.LOCATION}
                                value={tour.destination}
                                onChange={(e) => {
                                    dispatch(SET_DESTINATION(e.target.value)), setAddressTerm(e.target.value);
                                }}
                                onFocus={() => setSearchMenu(ESearchMenu.LOCATION)}
                                // onBlur={handleOnBlur}
                                onClear={() => {
                                    dispatch(SET_DESTINATION(''));
                                    handleOnBlur();
                                }}
                            >
                                <SearchOptionWrapper className="left-[-24px]">
                                    <AddressWrapper status={isSuccess} response={data} loading={isLoading} onBlur={handleOnBlur} />
                                </SearchOptionWrapper>
                            </SearchOptionButton>
                        </div>
                    </Box>
                </VStack>
            </div>
        </>
    );
};

export default LocationSt1;
