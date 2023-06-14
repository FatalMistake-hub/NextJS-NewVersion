import { Box, VStack, Text, Heading, Button, SimpleGrid, RadioGroup, Radio } from '@chakra-ui/react';

import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectBecomeHost, SET_btnSTATUS, SET_CATEGORY, SET_DESTINATION } from 'src/redux/slice/becomeHostSlice';
import { IAllCategory, ICategory } from 'src/types/category.type';
interface Props {
    dataCategory: IAllCategory;
}
const CategorySt1: FC<Props> = ({ dataCategory }) => {
    const { tour } = useAppSelector(selectBecomeHost);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tour.categories[0].categoryId === undefined || tour.categories[0].categoryName === 'undefined') {
            dispatch(SET_btnSTATUS(true));
        } else {
            dispatch(SET_btnSTATUS(false));
        }
        return () => {};
    }, [tour.categories[0].categoryId, tour.categories[0].categoryName]);

    return (
        <>
            <div className="w-full justify-center  flex min-h-[calc(100vh-176px)] px-20">
                <VStack w={'700px'} align={'left'} gap={2} mt={8}>
                    <Heading
                        lineHeight={1.2}
                        as="h1"
                        fontSize={'32px'}
                        fontWeight={'600'}
                        width={'full'}
                        // noOfLines={2}
                        pb={4}
                    >
                        Trải nghiệm của bạn sẽ tập trung vào điều gì ?
                    </Heading>
                    <Text fontSize={'16px'} fontWeight={'500'} pb={4}>
                        Chọn chủ đề phù hợp nhất mà bạn nghĩ khách hàng sẽ thích.
                    </Text>
                    {/* <Button bgColor={'black'} colorScheme={''} w="10rem" size={'lg'}>
                        Chọn chủ đề
                    </Button> */}
                    <RadioGroup
                        onChange={(e) => {
                            dispatch(
                                SET_CATEGORY({
                                    categoryId: Number(e),
                                    categoryName: dataCategory.find((item) => item.categoryId === Number(e))?.categoryName,
                                } as ICategory),
                            );
                        }}
                        value={`${tour.categories[0].categoryId}`}
                    >
                        <SimpleGrid columns={2} spacing={16}>
                            {dataCategory.map((result: any, index) => (
                                <Box
                                    key={result.categoryId}
                                    alignItems={'center'}
                                    display={'flex'}
                                    borderBottom={'1px solid #00000071'}
                                    height="70px"
                                    justifyContent={'space-between'}
                                >
                                    <Text fontSize={'16px'} fontWeight={'500'}>
                                        {result.categoryName}
                                    </Text>
                                    <Radio value={`${result.categoryId}`} size={'lg'}></Radio>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </RadioGroup>
                </VStack>
            </div>
        </>
    );
};

export default CategorySt1;
