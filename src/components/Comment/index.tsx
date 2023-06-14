import { FC, useState } from 'react';
import { Heading, Flex, Avatar, Text, Collapse, Button, Box } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
const Comment: FC = () => {
    const [show, setShow] = useState(true);

    const handleToggle = () => setShow(!show);
    return (
        <>
            <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} className="mb-6 px-3 flex items-center">
                <FaStar className="w-4 h-4" />
                <Text className="ml-2 ">4.94 (30 đánh giá)</Text>
            </Heading>
            <Flex width={'100%'} flexWrap={'wrap'}>
                <div className="px-2 w-[41.6667%] mr-[8.3333%] mb-10">
                    <div className="flex w-full mb-6">
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" className="mr-4" />

                        <section>
                            <Heading lineHeight={1.4} as="h1" fontSize={'16px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={1}>
                                GMatt
                            </Heading>
                            <Text className="text-sm  text-gray-400">tháng 4 năm 2023</Text>
                        </section>
                    </div>
                    <Collapse startingHeight={70} in={show}>
                        Đó là một buổi tối tuyệt vời để khám phá các nhà hàng địa phương và thuần chay tốt trong thành phố. Chủ nhà Nguyễn
                        của chúng tôi rất hào phóng với thông tin được cung cấp và thời gian của anh ấy. Bạn không cần phải là người thuần
                        chay để đánh giá đầy đủ hoạt động này. Thật thú vị khi thực hiện hoạt động khi chúng tôi đến vì chúng tôi có rất
                        nhiều địa chỉ tốt của các nhà hàng thuần chay giá rẻ cho thời gian lưu trú! Tôi đánh giá cao đề xuất!
                    </Collapse>
                    <Button size="sm" variant={'link'} onClick={() => handleToggle} mt="1rem" color={'black'}>
                        <Text mr={1} textDecoration={'underline'}>
                            {' '}
                            {show ? 'Xem thêm' : 'Ẩn bớt'}
                        </Text>{' '}
                        {'>'}
                    </Button>
                </div>
                <div className="px-2 w-[41.6667%] mr-[8.3333%] mb-10">
                    <div className="flex w-full mb-6">
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" className="mr-4" />

                        <section>
                            <Heading lineHeight={1.4} as="h1" fontSize={'16px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={1}>
                                GMatt
                            </Heading>
                            <Text className="text-sm  text-gray-400">tháng 4 năm 2023</Text>
                        </section>
                    </div>
                    <Collapse startingHeight={70} in={show}>
                        Đó là một buổi tối tuyệt vời để khám phá các nhà hàng địa phương và thuần chay tốt trong thành phố. Chủ nhà Nguyễn
                        của chúng tôi rất hào phóng với thông tin được cung cấp và thời gian của anh ấy. Bạn không cần phải là người thuần
                        chay để đánh giá đầy đủ hoạt động này. Thật thú vị khi thực hiện hoạt động khi chúng tôi đến vì chúng tôi có rất
                        nhiều địa chỉ tốt của các nhà hàng thuần chay giá rẻ cho thời gian lưu trú! Tôi đánh giá cao đề xuất!
                    </Collapse>
                    <Button size="sm" variant={'link'} onClick={() => handleToggle} mt="1rem" color={'black'}>
                        <Text mr={1} textDecoration={'underline'}>
                            {' '}
                            {show ? 'Xem thêm' : 'Ẩn bớt'}
                        </Text>{' '}
                        {'>'}
                    </Button>
                </div>
                <div className="px-2 w-[41.6667%] mr-[8.3333%] mb-10">
                    <div className="flex w-full mb-6">
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" className="mr-4" />

                        <section>
                            <Heading lineHeight={1.4} as="h1" fontSize={'16px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={1}>
                                GMatt
                            </Heading>
                            <Text className="text-sm  text-gray-400">tháng 4 năm 2023</Text>
                        </section>
                    </div>
                    <Collapse startingHeight={70} in={show}>
                        Đó là một buổi tối tuyệt vời để khám phá các nhà hàng địa phương và thuần chay tốt trong thành phố. Chủ nhà Nguyễn
                        của chúng tôi rất hào phóng với thông tin được cung cấp và thời gian của anh ấy. Bạn không cần phải là người thuần
                        chay để đánh giá đầy đủ hoạt động này. Thật thú vị khi thực hiện hoạt động khi chúng tôi đến vì chúng tôi có rất
                        nhiều địa chỉ tốt của các nhà hàng thuần chay giá rẻ cho thời gian lưu trú! Tôi đánh giá cao đề xuất!
                    </Collapse>
                    <Button size="sm" variant={'link'} onClick={() => handleToggle} mt="1rem" color={'black'}>
                        <Text mr={1} textDecoration={'underline'}>
                            {' '}
                            {show ? 'Xem thêm' : 'Ẩn bớt'}
                        </Text>{' '}
                        {'>'}
                    </Button>
                </div>
                <div className="px-2 w-[41.6667%] mr-[8.3333%] mb-10">
                    <div className="flex w-full mb-6">
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" className="mr-4" />

                        <section>
                            <Heading lineHeight={1.4} as="h1" fontSize={'16px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={1}>
                                GMatt
                            </Heading>
                            <Text className="text-sm  text-gray-400">tháng 4 năm 2023</Text>
                        </section>
                    </div>
                    <Collapse startingHeight={70} in={show}>
                        Đó là một buổi tối tuyệt vời để khám phá các nhà hàng địa phương và thuần chay tốt trong thành phố. Chủ nhà Nguyễn
                        của chúng tôi rất hào phóng với thông tin được cung cấp và thời gian của anh ấy. Bạn không cần phải là người thuần
                        chay để đánh giá đầy đủ hoạt động này. Thật thú vị khi thực hiện hoạt động khi chúng tôi đến vì chúng tôi có rất
                        nhiều địa chỉ tốt của các nhà hàng thuần chay giá rẻ cho thời gian lưu trú! Tôi đánh giá cao đề xuất!
                    </Collapse>
                    <Button size="sm" variant={'link'} onClick={() => handleToggle} mt="1rem" color={'black'}>
                        <Text mr={1} textDecoration={'underline'}>
                            {' '}
                            {show ? 'Xem thêm' : 'Ẩn bớt'}
                        </Text>{' '}
                        {'>'}
                    </Button>
                </div>
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
                    Hiển thị tất cả 31 đánh giá
                </Text>
            </Button>
        </>
    );
};

export default Comment;
