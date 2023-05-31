import { VStack, StackDivider, Button, Text, useDisclosure, Fade, Box, Textarea } from '@chakra-ui/react';
import LocationModal from '@components/Modal/LocationModal';
import TourFormWrapper from '@components/Wrapper/TourFormWrapper';
const Location = () => {
    const Disclosure1 = useDisclosure();
    const { isOpen, onToggle, onClose, onOpen } = useDisclosure();

    return (
        <>
            <VStack divider={<StackDivider borderColor="black.200" />} align="stretch" width={'full'} spacing={6}>
                <Box>
                    <div className="py-2 flex items-start justify-between w-full">
                        <div>
                            <Text mb={1} fontSize={'16px'} fontWeight={400}>
                                Địa chỉ
                            </Text>
                            <Text mb={1} fontSize={'14px'} color={'gray.600'}>
                                87 Mai Chí Thọ, Hoà Xuân, Cẩm Lệ, Đà Nẵng 550000, Vietnam
                            </Text>
                        </div>
                        <div className="flex flex-col items-end">
                            <Button
                                size={'sm'}
                                variant={'ghost'}
                                textDecoration={'underline'}
                                color={'black'}
                                rounded={'lg'}
                                onClick={onOpen}
                            >
                                {!isOpen ? 'Chỉnh sửa' : 'Thu gọn'}
                            </Button>
                        </div>
                    </div>
                    <LocationModal isOpen={isOpen} onClose={onClose} />
                  
                </Box>
                <Box>
                    <div className="py-2 flex items-start justify-between w-full">
                        <div>
                            <Text mb={1} fontSize={'16px'} fontWeight={400}>
                                Mô tả địa điểm tổ chức trải nghiệm
                            </Text>
                            <Text mb={1} fontSize={'14px'} color={'gray.600'}>
                                Nghỉ ngơi và thư giãn tại ốc đảo yên bình này.
                            </Text>
                        </div>
                        <div className="flex flex-col items-end">
                            <Button
                                size={'sm'}
                                variant={'ghost'}
                                textDecoration={'underline'}
                                color={'black'}
                                rounded={'lg'}
                                onClick={Disclosure1.onToggle}
                            >
                                {!Disclosure1.isOpen ? 'Chỉnh sửa' : 'Thu gọn'}
                            </Button>
                        </div>
                    </div>
                    <Fade in={Disclosure1.isOpen}>
                        <Box display={Disclosure1.isOpen ? 'block' : 'none'}>
                            <TourFormWrapper>
                                <Text
                                    fontSize={'16px'}
                                    fontWeight={'600'}
                                    width={'full'}
                                    // noOfLines={2}
                                    letterSpacing={'tight'}
                                >
                                    Hãy mô tả về trải nghiệm của bạn
                                </Text>
                                <Text fontSize={'14px'} fontWeight={'400'}>
                                    Chia sẻ một số điểm nổi bật về địa điểm .
                                </Text>
                                <Textarea
                                    focusBorderColor={'teal.500'}
                                    resize={'vertical'}
                                    p={4}
                                    mt={4}
                                    // value={tour.title}
                                    // onChange={handleInputChange}
                                    placeholder="Giới thiệu điều đặc biệt tại điểm đến của bạn, ví dụ như lịch sử, văn hóa, ..."
                                    fontSize={'base'}
                                    size="sm"
                                    rounded={'lg'}
                                    colorScheme={'teal'}
                                    w={'70%'}
                                    fontWeight={'600'}
                                    _placeholder={{ color: 'gray.300' }}
                                    minH={'100px'}
                                />
                            </TourFormWrapper>
                        </Box>
                    </Fade>
                </Box>
            </VStack>
        </>
    );
};

export default Location;
