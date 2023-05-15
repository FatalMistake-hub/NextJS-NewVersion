import { useRouter } from 'next/router';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    GridItem,
    useDisclosure,
    Flex,
    Button,
    Heading,
    Grid,
    VStack,
    StackDivider,
    Box,
    Text,
    Avatar,
    Collapse,
} from '@chakra-ui/react';
import { BiCheck, BiChevronRight, BiNotification, BiShare, BiStar } from 'react-icons/bi';
import Rating from '@components/Card/Rating';
import { BsHeart, BsShieldFillCheck, BsStar } from 'react-icons/bs';
import Image from 'next/image';
import { useState } from 'react';
import CardBooking from '@components/Card/CardBooking';
import { FaStar, FaUser } from 'react-icons/fa';
import Comment from '@components/Comment';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper';
import CardItem from '@components/Card/CardItem';
import { FiMoreVertical } from 'react-icons/fi';
import AllPictureModal from '@components/Modal/AllPictureModal';
import CardSelectDay from '@components/Card/CardSelectDay';
import AllDayModal from '@components/Modal/AllDayModal';
import useGetDetailTour from 'src/hooks/tours/useGetDetailTour';
function Tours() {
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading, isError, isSuccess } = useGetDetailTour(id);
    const [show, setShow] = useState<any>({ cp1: false, cp2: false, cp3: false, cp4: false });

    const handleToggle = (name: string) => setShow((prevState: any) => ({ ...prevState, [name]: !prevState[name] }));

    const { isOpen: isModalOpen, onClose: onModalClose, onOpen: onModalOpen } = useDisclosure();
    const { isOpen: isModalOpen2, onClose: onModalClose2, onOpen: onModalOpen2 } = useDisclosure();

    return (
        <>
            {data ? (
                <Flex display="flex" flexDirection="column" justifyContent="center" alignItems="center" margin={'auto'} maxW={'1120px'}>
                    <div className="w-full py-8 underline">
                        <Breadcrumb spacing="8px" separator={<BiChevronRight color="gray.500" />}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Home</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">About</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem isCurrentPage>
                                <BreadcrumbLink href="#">Contact</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    <Heading lineHeight={1.4} as="h1" fontSize={'26px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={1}>
                        {data?.title}
                    </Heading>
                    <div className="w-full flex justify-between items-center">
                        <div className="mt-1">
                            <Rating rating={data.rating} avgRating={data.avgRating} location={data.city} />
                        </div>
                        <div className="flex items-center">
                            <Button leftIcon={<BiShare />} color={'black'} variant={'ghost'} className="hover:bg-slate-100 underline ">
                                Chia sẻ
                            </Button>
                            <Button leftIcon={<BsHeart />} color={'black'} variant={'ghost'} className="hover:bg-slate-100 underline ">
                                Lưu
                            </Button>
                        </div>
                    </div>
                    <div className="w-full h-full mt-8 rounded-lg max-h-[415px] overflow-hidden relative">
                        <Grid
                            templateAreas={`
                  "pic pic1 pic2 pic4"
                  "pic pic1 pic3 pic4"`}
                            gridTemplateRows={'1fr 1fr'}
                            gridTemplateColumns={'1fr 1fr 0.5fr 1fr'}
                            h={'440px'}
                            gap="8px"
                            color="blackAlpha.700"
                            fontWeight="bold"
                            borderRadius={'xl'}
                        >
                            <>
                                <GridItem area={'pic'} position="relative">
                                    <Image
                                        src={data?.images[0].link}
                                        alt={`Picture of `}
                                        layout="fill"
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={data?.images[0].link}
                                        className=""
                                    />
                                </GridItem>
                                <GridItem area={'pic1'} position="relative">
                                    <Image
                                        src={data?.images[1].link}
                                        alt={`Picture of `}
                                        layout="fill"
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={data?.images[1].link}
                                        className=""
                                    />
                                </GridItem>
                                <GridItem area={'pic2'} position="relative">
                                    <Image
                                        src={data?.images[2].link}
                                        alt={`Picture of `}
                                        layout="fill"
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={data?.images[2].link}
                                        className=""
                                    />
                                </GridItem>
                                <GridItem area={'pic3'} position="relative">
                                    <Image
                                        src={data?.images[3].link}
                                        alt={`Picture of `}
                                        layout="fill"
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={data?.images[3].link}
                                        className=""
                                    />
                                </GridItem>
                                <GridItem area={'pic4'} position="relative">
                                    <Image
                                        src={data?.images[4].link}
                                        alt={`Picture of `}
                                        layout="fill"
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={data?.images[4].link}
                                        className=""
                                    />
                                </GridItem>
                            </>
                        </Grid>
                        <div className="absolute bottom-4 right-4 z-10">
                            <Button
                                onClick={onModalOpen}
                                size={'sm'}
                                colorScheme="black"
                                bgColor={'white'}
                                color={'black'}
                                variant="outline"
                                leftIcon={<FiMoreVertical />}
                            >
                                Hiển thị tất cả ảnh
                            </Button>
                        </div>
                    </div>
                    <VStack divider={<StackDivider borderColor="black.200" />} align="stretch">
                        <Box display={'flex'} width={'100%'}>
                            <div className="relative w-[58.33333333336%]">
                                <VStack divider={<StackDivider borderColor="black.200" />} align="stretch">
                                    <Box pt={12} pb={6}>
                                        <div className="flex justify-between items-center">
                                            <section>
                                                <Heading
                                                    lineHeight={1.4}
                                                    as="h2"
                                                    fontSize={'22px'}
                                                    fontWeight={'600'}
                                                    width={'full'}
                                                    noOfLines={1}
                                                    mb={1}
                                                    size={'lg'}
                                                >
                                                    Trải nghiệm do An tổ chức
                                                </Heading>
                                                <Text>2,5 giờ - Ngôn ngữ: Tiếng Anh, Tiếng Đức, Tiếng Pháp và Tiếng Hàn Quốc</Text>
                                            </section>
                                            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                                        </div>
                                    </Box>
                                    <Box py={12}>
                                        <Heading
                                            lineHeight={1.4}
                                            as="h2"
                                            fontSize={'22px'}
                                            fontWeight={'600'}
                                            width={'full'}
                                            noOfLines={1}
                                            mb={6}
                                        >
                                            Những điều bạn sẽ làm
                                        </Heading>
                                        <Collapse startingHeight={170} in={show.cp1}>
                                            <div dangerouslySetInnerHTML={{ __html: `${data?.working}` }}></div>
                                        </Collapse>
                                        <Button size="sm" variant={'link'} onClick={() => handleToggle('cp1')} mt="1rem">
                                            {show.cp1 ? 'Ẩn bớt' : 'Xem thêm'}
                                        </Button>
                                    </Box>
                                    <Box py={12}>
                                        <div className="flex w-full mb-6">
                                            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" className="mr-4" size={'lg'} />

                                            <section>
                                                <Heading
                                                    lineHeight={1.4}
                                                    as="h2"
                                                    fontSize={'22px'}
                                                    fontWeight={'600'}
                                                    width={'full'}
                                                    noOfLines={1}
                                                    mb={1}
                                                >
                                                    Gặp gỡ người tổ chức của bạn – Huy
                                                </Heading>
                                                <Text className="text-sm">Tổ chức trải nghiệm trên Airbnb kể từ 2016</Text>
                                            </section>
                                        </div>
                                        <ul className="flex w-full mb-3 mx-[-12px]">
                                            <li className="mb-3 px-3 flex items-center">
                                                <FaStar className="w-4 h-4" />
                                                <Text className="ml-2 ">30 đánh giá</Text>
                                            </li>
                                            <li className="mb-3 px-3 flex items-center">
                                                <BsShieldFillCheck className="w-4 h-4" />
                                                <Text className="ml-2 ">Đã xác minh danh tính</Text>
                                            </li>
                                        </ul>
                                        <Collapse startingHeight={170} in={show.cp2}>
                                            Xin chào, tên tôi là Huy. Một đứa trẻ lớn thích đi du lịch và "yêu thích ẩm thực". Tôi đã đến
                                            một số quốc gia và nhận ra rằng không nơi nào có thể đánh bại thành phố của tôi khi thảo luận về
                                            sự đa dạng của thực phẩm thuần chay. <br />
                                            <br />
                                            Hãy tham gia trải nghiệm này, chúng tôi hứa rằng nhóm của chúng tôi sẽ kích hoạt năm giác quan
                                            của bạn. Chúng tôi ngửi, chúng tôi chạm vào, chúng tôi nhìn, chúng tôi nghe và chúng tôi nếm thử
                                            những ảnh hưởng đa văn hóa tại Hội An.
                                            <br />
                                            <br />
                                            Tất cả những nơi chúng tôi sẽ ghé thăm đều được người dân địa phương lựa chọn thủ công. Tham gia
                                            với chúng tôi để tận hưởng trái tim của bạn với Món ăn thuần chay Hội An!
                                        </Collapse>
                                        <Button size="sm" variant={'link'} onClick={() => handleToggle('cp2')} mt="1rem">
                                            {show.cp2 ? 'Ẩn bớt' : 'Xem thêm'}
                                        </Button>
                                        <div className="flex w-full mt-8 items-center">
                                            <Box
                                                border={'1px solid #000000'}
                                                borderRadius={'8px'}
                                                color={'black'}
                                                minWidth={'160px'}
                                                height={'68px'}
                                                display={'flex'}
                                                className="hover:bg-gray-100 cursor-pointer"
                                            >
                                                <Text className="text-base break-words font-semibold  w-full  h-full py-3 px-6 text-center flex items-center">
                                                    Liên hệ với người tổ chức
                                                </Text>
                                            </Box>
                                            <Text className="ml-6 text-sm flex items-center">
                                                <div className="min-w-[16px] mr-3 ">
                                                    <BiNotification className="w-4 h-4 " />
                                                </div>
                                                Để bảo vệ khoản thanh toán của bạn, tuyệt đối không chuyển tiền hoặc liên lạc bên ngoài
                                                trang web hoặc ứng dụng Airbnb.
                                            </Text>
                                        </div>
                                    </Box>
                                </VStack>
                            </div>
                            <div className="relative w-[33.33333333333%] ml-[8.33333333332%]">
                                <CardBooking priceOnePerson={data?.priceOnePerson} />
                            </div>
                        </Box>
                        <Box py={12}>
                            <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={6}>
                                Nơi bạn sẽ đến
                            </Heading>
                            <Text className="pt-6">
                                <div dangerouslySetInnerHTML={{ __html: `${data?.destinationDescription}` }}></div>
                            </Text>
                        </Box>
                        <Box py={12}>
                            <Comment />
                        </Box>
                        <Box py={12}>
                            <section>
                                <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1}>
                                    Chọn trong số các ngày còn trống
                                </Heading>
                                <Text mb={6} className="text-base  text-gray-400">
                                    Có sẵn 311
                                </Text>

                                <div className=" max-w-[1120px] ">
                                    <Swiper
                                        slidesPerView={5}
                                        spaceBetween={20}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[Pagination]}
                                        className="min-h-[240px]"
                                    >
                                        <SwiperSlide>
                                            <CardSelectDay />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <CardSelectDay />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <CardSelectDay />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <CardSelectDay />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <CardSelectDay />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <CardSelectDay />
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                                <Button
                                    border={'1px solid #000000'}
                                    borderRadius={'8px'}
                                    color={'black'}
                                    height={'48px'}
                                    display={'flex'}
                                    colorScheme={'white'}
                                    className="hover:bg-gray-100 cursor-pointer"
                                    width={'20%'}
                                    mt={4}
                                    onClick={onModalOpen2}
                                >
                                    <Text className="text-base break-words font-semibold  w-full  h-full py-3  text-center flex items-center justify-center">
                                        Hiển thị các ngày khác
                                    </Text>
                                </Button>
                            </section>
                        </Box>
                        <Box py={12}>
                            <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={6}>
                                Những điều cần biết
                            </Heading>
                            <div className="flex justify-start flex-wrap w-full mx-[-8px]">
                                <div className="px-2 w-[33%]">
                                    <div className="pr-8 mb-8">
                                        <Heading
                                            lineHeight={1.4}
                                            as="h3"
                                            fontSize={'16px'}
                                            fontWeight={'600'}
                                            width={'full'}
                                            noOfLines={1}
                                            mb={4}
                                        >
                                            Yêu cầu đối với khách
                                        </Heading>
                                        <div className="flex items-baseline mb-4">
                                            <div className="mr-2 min-w-[16px]  ">
                                                <FaUser />
                                            </div>
                                            <Text>
                                                Khách từ 10 tuổi trở lên có thể tham gia, tổng cộng tối đa 10 khách. Cha mẹ cũng có thể mang
                                                theo trẻ dưới 2 tuổi.
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-2 w-[33%]">
                                    <div className="pr-8 mb-8">
                                        <Heading
                                            lineHeight={1.4}
                                            as="h3"
                                            fontSize={'16px'}
                                            fontWeight={'600'}
                                            width={'full'}
                                            noOfLines={1}
                                            mb={4}
                                        >
                                            Yêu cầu đối với khách
                                        </Heading>
                                        <div className="flex items-baseline mb-4">
                                            <div className="mr-2 min-w-[16px] ">
                                                <FaUser />
                                            </div>
                                            <Text>
                                                Khách từ 10 tuổi trở lên có thể tham gia, tổng cộng tối đa 10 khách. Cha mẹ cũng có thể mang
                                                theo trẻ dưới 2 tuổi.
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-2 w-[33%]">
                                    <div className="pr-8 mb-8">
                                        <Heading
                                            lineHeight={1.4}
                                            as="h3"
                                            fontSize={'16px'}
                                            fontWeight={'600'}
                                            width={'full'}
                                            noOfLines={1}
                                            mb={4}
                                        >
                                            Yêu cầu đối với khách
                                        </Heading>
                                        <div className="flex items-baseline mb-4">
                                            <div className="mr-2 min-w-[16px] ">
                                                <FaUser />
                                            </div>
                                            <Text>
                                                Khách từ 10 tuổi trở lên có thể tham gia, tổng cộng tối đa 10 khách. Cha mẹ cũng có thể mang
                                                theo trẻ dưới 2 tuổi.
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Box>
                        <Box py={12}>
                            <section>
                                <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1}>
                                    Trải nghiệm tương tự
                                </Heading>
                                <div className=" max-w-[1120px]">
                                    <Swiper
                                        slidesPerView={6}
                                        spaceBetween={15}
                                        freeMode={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[FreeMode, Pagination]}
                                        className="mySwiper"
                                    >
                                        {/* <SwiperSlide>
                                    <CardItem className="h-[370px]" />
                                </SwiperSlide> */}
                                    </Swiper>
                                </div>
                            </section>
                        </Box>
                    </VStack>
                    <AllPictureModal isOpen={isModalOpen} onClose={onModalClose} data={data?.images} />
                    <AllDayModal isOpen={isModalOpen2} onClose={onModalClose2} />
                </Flex>
            ) : (
                <div></div>
            )}
        </>
    );
}
export default Tours;
