import { Box, VStack, Text, Heading } from '@chakra-ui/react';
import MapBase from '@components/Map/MapBase';
import MapLocation from '@components/Map/MapLocation';
import SearchOptionButton from '@components/Search/SearchOptionButton';
import SearchOptionWrapper from '@components/Search/SearchOptionWrapper';
import AddressWrapper from '@components/Wrapper/AddressWrapper';
import LocationWrapper from '@components/Wrapper/LocationWrapper';
import React, { ChangeEvent, FC, FocusEvent, FormEvent, useState } from 'react';
import useSearchLocation from 'src/hooks/map/useSearchLocation';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectSearch, SET_LOCATION } from 'src/redux/slice/searchSlice';
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
    const { data, isSuccess, isLoading, setSearchTerm } = useSearchLocation();
    const { location, checkIn, checkOut, guests } = useAppSelector(selectSearch);
    const dispatch = useAppDispatch();
    const [searchMenu, setSearchMenu] = useState<ESearchMenu | null>(null);
    return (
        <>
            <div className="w-full justify-center  flex h-full px-20">
                <VStack w={'630px'} align={'left'} gap={1} mt={8}>
                    <Heading
                        lineHeight={'54px'}
                        as="h1"
                        fontSize={'32px'}
                        fontWeight={'600'}
                        width={'full'}
                        noOfLines={2}
                        letterSpacing={'tight'}
                    >
                        Nơi tổ chức của bạn nằm ở đâu?
                    </Heading>
                    <Text fontSize={'18px'} fontWeight={'400'}>
                        Địa chỉ được chia sẻ với khách sau khi họ đặt trải nghiệm thành công.
                    </Text>
                    <Box pb={12} pt={8} w={'full'} h={'full'} position={'relative'}>
                        <MapLocation />
                        <div className="w-[500px] absolute top-14 left-16 min-h-[64px]">
                            <SearchOptionButton
                                separator
                                relative
                                type="inputText"
                                title="Địa chỉ"
                                placeholder="Nhập địa chỉ của bạn"
                                active={searchMenu === ESearchMenu.LOCATION}
                                value={location}
                                onChange={(e) => {
                                    dispatch(SET_LOCATION(e.target.value)), setSearchTerm(e.target.value);
                                }}
                                onFocus={() => setSearchMenu(ESearchMenu.LOCATION)}
                                onBlur={handleOnBlur}
                                onClear={() => {
                                    dispatch(SET_LOCATION(''));
                                    handleOnBlur();
                                }}
                            >
                                <SearchOptionWrapper className="left-0">
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
