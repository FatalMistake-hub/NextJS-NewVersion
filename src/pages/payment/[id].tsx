import { Heading, Text, Button, IconButton } from '@chakra-ui/react';
import { BiChevronLeft } from 'react-icons/bi';
const Payment = () => {
    return (
        <div className="w-full h-full ">
            <div className="px-20 max-w-[1280px] mx-auto pb-12 pt-16 flex items-center">
                <IconButton
                    colorScheme={'blackAlpha'}
                    size={'lg'}
                    color={'black'}
                    icon={<BiChevronLeft className="w-6 h-6" />}
                    rounded={'full'}
                    variant="ghost"
                    aria-label={'CheckOut'}
                ></IconButton>
                <Heading as="h1" fontSize={'32px'} fontWeight={'600'} width={'full'} noOfLines={1}>
                    Xác nhận và thanh toán
                </Heading>
            </div>
            <div className="mx-auto px-20 flex items-stretch justify-start w-full flex-wrap  max-w-[1280px]  ">
                <div className="w-[50%] relative">
                    <Heading as="h4" fontSize={'18px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={4}>
                        Th 4, 10 thg 5
                    </Heading>
                    <div className="mb-4 border rounded-lg ">
                        <div className="p-6 flex flex-col">
                            <div className=" flex justify-between items-start  ">
                                <div className="">
                                    <Text mb={1} fontSize={'16px'} color={'black.500'}>
                                        18:00–20:30
                                    </Text>
                                    <Text mb={4} fontSize={'16px'} fontWeight={600}>
                                        Từ $35<span className="font-normal">/người</span>
                                    </Text>
                                </div>
                                <Button colorScheme={'teal'}>Chọn</Button>
                            </div>
                            <Text mt={6} fontSize={'14px'} color={'black.500'}>
                                Được tổ chức bằng Tiếng Anh, Tiếng Hàn Quốc và Tiếng Nhật Bản
                            </Text>
                        </div>
                    </div>
                </div>
          <div className="w-[41.6667%] ml-[8.3333%] relative">
            <div className="sticky top-[130px]"></div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
