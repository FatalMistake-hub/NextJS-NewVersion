import { Avatar, Button, Collapse, Heading, Text } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { IReview } from 'src/types/review.type';
type Props = {
    item?: IReview;
};
const CommentItem: FC<Props> = ({ item }) => {
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);
    return (
        <div key={item?.reviewId} className="px-2 w-[41.6667%] mr-[8.3333%] mb-10">
            <div className="flex w-full mb-6">
                <Avatar
                    name={item?.user?.userName}
                    src={item?.user?.urlImage ? item?.user?.urlImage : 'https://bit.ly/broken-link'}
                    className="mr-4"
                />

                <section>
                    <Heading lineHeight={1.4} as="h1" fontSize={'16px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={1}>
                        {item?.user?.userName}
                        Ng.TriAn
                    </Heading>
                    <Text className="text-sm  text-gray-400">tháng 4 năm 2023</Text>
                </section>
            </div>
            <Collapse startingHeight={70} in={show}>
                {item?.comment}
            </Collapse>
            <Button size="sm" variant={'link'} onClick={handleToggle} mt="1rem" color={'black'}>
                <Text mr={1} textDecoration={'underline'}>
                    {' '}
                    {!show ? 'Xem thêm' : 'Ẩn bớt'}
                </Text>{' '}
                {'>'}
            </Button>
        </div>
    );
};
export default CommentItem;
