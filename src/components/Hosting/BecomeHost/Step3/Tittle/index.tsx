import {  VStack, Text, Heading, Textarea } from '@chakra-ui/react';

import { ChangeEvent, useMemo, useRef } from 'react';

import { useAppSelector, useAppDispatch } from 'src/redux/hook';
import { selectBecomeHost, SET_btnSTATUS, SET_TITLE } from 'src/redux/slice/becomeHostSlice';
const TittleSt3 = () => {
    const { tour } = useAppSelector(selectBecomeHost);
    const dispatch = useAppDispatch();
    useMemo(() => {
        if (tour.title === '') {
            dispatch(SET_btnSTATUS(true));
        } else {
            dispatch(SET_btnSTATUS(false));
        }
    }, [tour.title]);
    let handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let inputValue = e.target.value;

        dispatch(SET_TITLE(inputValue));
    };
    return (
        <>
            <div className="w-full justify-center items-center flex min-h-[calc(100vh-176px)] px-20">
                <VStack w={'700px'} align={'left'} gap={2}>
                    <Heading
                        lineHeight={1.2}
                        as="h1"
                        fontSize={'32px'}
                        fontWeight={'600'}
                        width={'full'}
                        // noOfLines={2}
                        letterSpacing={'tight'}
                    >
                        Hãy đặt tên cho trải nghiệm của bạn
                    </Heading>
                    <Text fontSize={'18px'} fontWeight={'400'}>
                        Tạo một tiêu đề mô tả sắc nét và độc đáo để khách hàng hiểu rõ về những gì bạn đang cung cấp.
                    </Text>
                    <Textarea
                        focusBorderColor={'teal.500'}
                        resize={'vertical'}
                        p={8}
                        value={tour.title}
                        onChange={handleInputChange}
                        placeholder="Những viên ngọc ẩn giấu của Hội An xưa"
                        fontSize={'3xl'}
                        size="sm"
                        rounded={'lg'}
                        colorScheme={'teal'}
                        fontWeight={'600'}
                        _placeholder={{ color: 'gray.300' }}
                        minH={'250px'}
                    />
                </VStack>
            </div>
        </>
    );
};

export default TittleSt3;
