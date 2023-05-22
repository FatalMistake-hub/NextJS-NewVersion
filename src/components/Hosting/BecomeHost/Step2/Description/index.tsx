import { VStack, Text, Heading, UnorderedList, ListItem, Textarea, Select } from '@chakra-ui/react';

import React, { FC, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectBecomeHost, SET_btnSTATUS } from 'src/redux/slice/becomeHostSlice';

const DescriptionSt1: FC = () => {
    const { tour } = useAppSelector(selectBecomeHost);

    const dispatch = useAppDispatch();

    useMemo(() => {
        if (tour.categories[0].categoryId === undefined) {
            dispatch(SET_btnSTATUS(true));
        } else {
            dispatch(SET_btnSTATUS(false));
        }
    }, [tour.categories[0].categoryId]);
    let [value, setValue] = useState('');

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value;
        setValue(inputValue);
    };
    return (
        <>
            <div className="w-full justify-center  flex h-full px-20">
                <VStack w={'630px'} align={'left'} gap={2} mt={8}>
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
                    <p>
                        <UnorderedList>
                            <ListItem> Cung cấp kế hoạch cụ thể từ đầu đến cuối, đưa ra nhiều ý tưởng hoặc lựa chọn</ListItem>
                            <ListItem>Mô tả điều gì làm cho trải nghiệm của bạn trở nên đặc biệt</ListItem>
                        </UnorderedList>
                    </p>
                    <Text mb="8px">Value: {value}</Text>
                    <Textarea
                        value={value}
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
                    <Select placeholder="large size" size="lg" rounded={'lg'} />
                    <Text mb="8px">Value: {value}</Text>
                    <Textarea
                        value={value}
                        onChange={handleInputChange}
                        placeholder="Kể cho khách nghe câu chuyện về những gì họ sẽ làm trong buổi trải nghiệm của bạn"
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

export default DescriptionSt1;
