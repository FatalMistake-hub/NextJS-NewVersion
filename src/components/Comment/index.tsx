import { FC, useState } from 'react';
import { Heading, Flex, Avatar, Text, Collapse, Button, Box } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { IReview } from 'src/types/review.type';
import CommentItem from './comment';
type Props = {
    data?: IReview[];
    averageRating?: number;
};
const Comment: FC<Props> = ({ data, averageRating }) => {
    return (
        <>
            <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} className="mb-6 px-3 flex items-center">
                <FaStar className="w-4 h-4" />
                <Text className="ml-2 ">
                    {averageRating} ({data?.length} đánh giá)
                </Text>
            </Heading>
            <Flex width={'100%'} flexWrap={'wrap'}>
                {data?.map((item, index) => (
                    <CommentItem item={item} />
                ))}
            </Flex>
            <Button
                border={'1px solid #000000'}
                borderRadius={'8px'}
                color={'black'}
                height={'45px'}
                display={'flex'}
                colorScheme={'white'}
                className="hover:bg-gray-100 cursor-pointer"
            >
                <Text className="text-base break-words font-semibold  w-full  h-full py-3  text-center flex items-center">
                    Hiển thị tất cả {data?.length} đánh giá
                </Text>
            </Button>
        </>
    );
};

export default Comment;
