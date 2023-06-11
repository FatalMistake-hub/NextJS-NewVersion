import { VStack, Text, Heading, UnorderedList, ListItem, Textarea, Select } from '@chakra-ui/react';

import React, { ChangeEvent, ChangeEventHandler, FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import {
    selectBecomeHost,
    SET_btnSTATUS,
    SET_destinationDECRIPTION,
    SET_TIMESLOTLENGTH,
    SET_WORKING,
} from 'src/redux/slice/becomeHostSlice';
import { listTimeSlot, numberToTime } from 'src/utils/dateUntils';

const DescriptionSt2: FC = () => {
    const { tour } = useAppSelector(selectBecomeHost);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tour.destinationDescription === '' || tour.working === '' || tour.timeSlotLength === 0) {
            dispatch(SET_btnSTATUS(true));
        } else {
            dispatch(SET_btnSTATUS(false));
        }
        return () => {};
    }, [tour.destinationDescription, tour.working, tour.timeSlotLength]);

    let handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let inputValue = e.target.value;

        dispatch(SET_WORKING(inputValue));
    };
    let handleInputChange1 = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let inputValue = e.target.value;

        dispatch(SET_destinationDECRIPTION(inputValue));
    };
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        //  setSelectedOption(event.target.value);
        dispatch(SET_TIMESLOTLENGTH(Number(event.target.value)));
    };
    const lisTimeSlot = listTimeSlot();

    return (
        <>
            <div className="w-full justify-center  flex h-full px-20">
                <VStack w={'700px'} align={'left'} gap={2} mt={4}>
                    <Heading
                        lineHeight={1.2}
                        as="h1"
                        fontSize={'32px'}
                        fontWeight={'600'}
                        width={'full'}
                        // noOfLines={2}
                        pb={4}
                    >
                        Hãy mô tả về trải nghiệm của bạn
                    </Heading>
                    <Text fontSize={'16px'} fontWeight={'500'} pb={2}>
                        Bạn và khách tham gia sẽ làm gì?
                    </Text>
                    
                        <UnorderedList>
                            <ListItem> Cung cấp kế hoạch cụ thể từ đầu đến cuối, đưa ra nhiều ý tưởng hoặc lựa chọn</ListItem>
                            <ListItem>Mô tả điều gì làm cho trải nghiệm của bạn trở nên đặc biệt</ListItem>
                        </UnorderedList>
                    
                    
                    <Textarea
                        fontSize={'16px'}
                        fontWeight={'500'}
                        focusBorderColor={'teal.500'}
                        resize={'vertical'}
                        p={4}
                        value={tour.working.replace(/<br\/>/g, '\n')}
                        onChange={handleInputChange}
                        placeholder="Kể cho khách nghe câu chuyện về những gì họ sẽ làm trong buổi trải nghiệm của bạn"
                        size="sm"
                        rounded={'lg'}
                        colorScheme={'teal'}
                        minH={'150px'}
                    />
                    <Text fontSize={'16px'} fontWeight={'500'} pt={4}>
                        Trải nghiệm của bạn diễn ra trong bao lâu?
                    </Text>
                    <Select size="lg" rounded={'lg'} focusBorderColor={'teal.500'} onChange={handleSelectChange} defaultValue={lisTimeSlot[3]}>
                        {lisTimeSlot.map((rs) => (
                            <option key={rs} value={rs} selected={tour.timeSlotLength === rs}>
                                {numberToTime(rs)}
                            </option>
                        ))}
                    </Select>
                    <Text fontSize={'16px'} fontWeight={'500'} pt={2}>
                        Mô tả địa điểm tổ chức trải nghiệm của bạn
                    </Text>
                    <Textarea
                        fontSize={'16px'}
                        fontWeight={'500'}
                        focusBorderColor={'teal.500'}
                        p={4}
                        resize={'vertical'}
                        value={tour.destinationDescription.replace(/<br\/>/g, '\n')}
                        onChange={handleInputChange1}
                        placeholder="Giới thiệu điều đặc biệt tại điểm đến của bạn, ví dụ như lịch sử, văn hóa, ..."
                        size="sm"
                        rounded={'lg'}
                        colorScheme={'teal'}
                        minH={'150px'}
                    />
                </VStack>
            </div>
        </>
    );
};

export default DescriptionSt2;
