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
    Skeleton,
    SkeletonCircle,
} from '@chakra-ui/react';
import { BiCheck, BiChevronRight, BiNotification, BiShare, BiStar } from 'react-icons/bi';
import Rating from '@components/Card/Rating';
import { BsGeoAltFill, BsHeart, BsShieldFillCheck, BsStar } from 'react-icons/bs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
import useGetDetailTour from 'src/hooks/guest/tours/useGetDetailTour';
import { numberToTime } from 'src/utils/dateUntils';
import MapTrip from '@components/Map/MapTrip';
import { Marker } from 'react-map-gl';
import useGetAllTimeBookingByRange from 'src/hooks/guest/timeBooking/useGetAllTimeBookingByRange';
import { IDayBook, TimeBookViewDtoList } from 'src/types/timeBooking.type';
import { useAppSelector, useAppDispatch } from 'src/redux/hook';
import { SET_CATEGORY, selectSearch } from 'src/redux/slice/searchSlice';
import moment from 'moment';
import { ICategory } from 'src/types/category.type';
import useGetReviewByTour from 'src/hooks/guest/review/useGetReviewByTour';
function Tours() {
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading, isError, isSuccess } = useGetDetailTour(id);
    const { location, checkIn, checkOut, guests, categoryList, viewport } = useAppSelector(selectSearch);
    const dispatch = useAppDispatch();
    const [show, setShow] = useState<any>({ cp1: false, cp2: false, cp3: false, cp4: false, cp5: false });

    const handleToggle = (name: string) => setShow((prevState: any) => ({ ...prevState, [name]: !prevState[name] }));

    const { isOpen: isModalOpen, onClose: onModalClose, onOpen: onModalOpen } = useDisclosure();
    const { isOpen: isModalOpen2, onClose: onModalClose2, onOpen: onModalOpen2 } = useDisclosure();

    // Ngày hiện tại

    const {
        data: dataTime,
        isFetching,
        isSuccess: isTimeSuccess,
    } = useGetAllTimeBookingByRange(moment(checkIn).format('YYYY-MM-DD'), moment(checkOut).format('YYYY-MM-DD'), 20, id);

    const [jsxCardBookTime, setJsxCardBookTime] = useState<any>([]);

    useEffect(() => {
        if (dataTime) {
            const updatedJsxMoreTime = dataTime.pages.flatMap((page: any) =>
                page.data.content.reduce((accumulator: any, day: IDayBook) => {
                    if (!day.isDeleted) {
                        const filteredTimes = day.timeBookDetailList.filter((time: TimeBookViewDtoList) => !time.isDeleted);
                        if (filteredTimes.length > 0) {
                            const timesWithDay = filteredTimes.map((time: TimeBookViewDtoList) => ({
                                ...time,
                                day: day.date_name,
                            }));
                            accumulator.push(...timesWithDay);
                        }
                    }
                    return accumulator;
                }, []),
            );

            const sortedJsxMoreTime = updatedJsxMoreTime.sort((a: any, b: any) => a.day.localeCompare(b.day));

            setJsxCardBookTime(sortedJsxMoreTime);
        }
    }, [dataTime]);
    const handleClickBreadCumb = async (cateory: ICategory) => {
        // await dispatch(SET_CATEGORY([]));
        // await dispatch(ADD_CATEGORY(cateory));
        await dispatch(SET_CATEGORY({}));
        await router.push({
            pathname: '/search',
            query: {
                location,
                checkIn: `${checkIn}`,
                checkOut: `${checkOut}`,
                guests: JSON.stringify(guests),
                categoryList: JSON.stringify(categoryList[categoryList.length - 1]),
                viewport: JSON.stringify(viewport),
            },
        });
    };
    // console.log(data);
    const { data: dataReview } = useGetReviewByTour(Number(id));
    return (
        <>
            {data ? (
                <Flex display="flex" flexDirection="column" justifyContent="center" alignItems="center" margin={'auto'} maxW={'1120px'}>
                    <div className="w-full py-8 underline">
                        {isLoading ? (
                            <Skeleton height="20px" width={'300px'} />
                        ) : (
                            <Breadcrumb spacing="8px" separator={<BiChevronRight color="gray.500" />}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                                </BreadcrumbItem>

                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        onClick={() => {
                                            handleClickBreadCumb({
                                                categoryId: data.categoryId,
                                                label: data.categoryName,
                                            });
                                        }}
                                    >
                                        {data.categoryName}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </Breadcrumb>
                        )}
                    </div>
                    <Heading lineHeight={1.4} as="h1" fontSize={'26px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={1}>
                        {isLoading ? <Skeleton height="26px" width={'500px'} /> : data?.title}
                    </Heading>

                    <div className="w-full flex justify-between items-center">
                        <div className="mt-1">
                            {isLoading ? (
                                <Skeleton height="20px" width={'200px'} />
                            ) : (
                                <Rating rating={data.rating} avgRating={data.avgRating} location={data.city} />
                            )}
                        </div>
                        {/* <div className="flex items-center">
                            <Button leftIcon={<BiShare />} color={'black'} variant={'ghost'} className="hover:bg-slate-100 underline ">
                                Chia sẻ
                            </Button>
                            <Button leftIcon={<BsHeart />} color={'black'} variant={'ghost'} className="hover:bg-slate-100 underline ">
                                Lưu
                            </Button>
                        </div> */}
                    </div>
                    <div className="w-full h-full mt-8 rounded-lg max-h-[full] overflow-hidden relative">
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
                                <GridItem area={'pic4'} position="relative">
                                    {isLoading ? (
                                        <Skeleton height="full" width={'full'} />
                                    ) : (
                                        <Image
                                            src={data?.imageMain}
                                            alt={`Picture of `}
                                            layout="fill"
                                            objectFit="cover"
                                            placeholder="blur"
                                            blurDataURL={data?.imageMain}
                                            className=""
                                        />
                                    )}
                                </GridItem>
                                <GridItem area={'pic'} position="relative">
                                    {isLoading ? (
                                        <Skeleton height="full" width={'full'} />
                                    ) : (
                                        <Image
                                            src={data?.images[0].link}
                                            alt={`Picture of `}
                                            layout="fill"
                                            objectFit="cover"
                                            placeholder="blur"
                                            blurDataURL={data?.images[0].link}
                                            className=""
                                        />
                                    )}
                                </GridItem>
                                <GridItem area={'pic1'} position="relative">
                                    {isLoading ? (
                                        <Skeleton height="full" width={'full'} />
                                    ) : (
                                        <Image
                                            src={data?.images[1].link}
                                            alt={`Picture of `}
                                            layout="fill"
                                            objectFit="cover"
                                            placeholder="blur"
                                            blurDataURL={data?.images[1].link}
                                            className=""
                                        />
                                    )}
                                </GridItem>
                                <GridItem area={'pic2'} position="relative">
                                    {isLoading ? (
                                        <Skeleton height="full" width={'full'} />
                                    ) : (
                                        <Image
                                            src={data?.images[2].link}
                                            alt={`Picture of `}
                                            layout="fill"
                                            objectFit="cover"
                                            placeholder="blur"
                                            blurDataURL={data?.images[2].link}
                                            className=""
                                        />
                                    )}
                                </GridItem>
                                <GridItem area={'pic3'} position="relative">
                                    {isLoading ? (
                                        <Skeleton height="full" width={'full'} />
                                    ) : (
                                        <Image
                                            src={data?.images[3].link}
                                            alt={`Picture of `}
                                            layout="fill"
                                            objectFit="cover"
                                            placeholder="blur"
                                            blurDataURL={data?.images[3].link}
                                            className=""
                                        />
                                    )}
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
                    <VStack divider={<StackDivider borderColor="black.200" />} align="stretch" pb={12}>
                        <Box display={'flex'} width={'100%'}>
                            <div className="relative w-[60%]">
                                <VStack divider={<StackDivider borderColor="black.200" />} align="stretch">
                                    <Box pt={12} pb={6}>
                                        <div className="flex justify-between items-center">
                                            <section>
                                                {isLoading ? (
                                                    <>
                                                        <Skeleton height="22px" width={'400px'} mb={2} />
                                                        <Skeleton height="20px" width={'250px'} />
                                                    </>
                                                ) : (
                                                    <>
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
                                                            Trải nghiệm do {data.user.userName} tổ chức
                                                        </Heading>
                                                        <Text>
                                                            {numberToTime(data.timeSlotLength)} - Ngôn ngữ: {data.user.language}
                                                        </Text>
                                                    </>
                                                )}
                                            </section>
                                            <Avatar
                                                name={data.user.userName}
                                                src={data.user.urlImage ? data.user.urlImage : 'https://bit.ly/broken-link'}
                                            />
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
                                            {show.cp1 ? 'Xem thêm' : 'Ẩn bớt'}
                                        </Button>
                                    </Box>
                                    <Box py={12}>
                                        <div className="flex w-full mb-6">
                                            {isLoading ? (
                                                <SkeletonCircle size={'lg'} />
                                            ) : (
                                                <Avatar
                                                    name={data.user.userName}
                                                    src={data.user.urlImage ? data.user.urlImage : 'https://bit.ly/broken-link'}
                                                    className="mr-4"
                                                    size={'lg'}
                                                />
                                            )}

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
                                                    Gặp gỡ người tổ chức của bạn – {data.user.userName}
                                                </Heading>
                                                <Text className="text-sm">Email: {data.user.userEmail}</Text>
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
                                            {data.user.description}
                                        </Collapse>
                                        <Button size="sm" variant={'link'} onClick={() => handleToggle('cp2')} mt="1rem">
                                            {show.cp2 ? 'Xem thêm' : 'Ẩn bớt'}
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
                                                trang web .
                                            </Text>
                                        </div>
                                    </Box>
                                </VStack>
                            </div>
                            <div className="relative w-[38%] ml-[12%]">
                                {isLoading ? (
                                    <div className="mt-11">
                                        <Skeleton height="40px" width={'300px'} mb={4} />
                                        <Skeleton height="60px" width={'400px'} />
                                    </div>
                                ) : (
                                    <CardBooking
                                        dataTimeBooking={jsxCardBookTime}
                                        priceOnePerson={data?.priceOnePerson}
                                        tourId={data.tourId}
                                        onOpen={onModalOpen2}
                                    />
                                )}
                            </div>
                        </Box>
                        <Box py={12}>
                            <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={6}>
                                Nơi bạn sẽ đến
                            </Heading>
                            <Box pb={2} pt={2} w={'full'} className={`h-[500px] relative drop-shadow-md`}>
                                <MapTrip center={{ longitude: Number(data.longitude), latitude: Number(data.latitude) }}>
                                    <Marker
                                        latitude={Number(data.latitude)}
                                        longitude={Number(data.longitude)}
                                        // offsetLeft={-20}
                                        // offsetTop={-10}
                                        // offset={[-20, -10]}
                                    >
                                        <BsGeoAltFill
                                            style={{ zIndex: 10 }}
                                            size={'3rem'}
                                            className=" text-[#3d9d9b] absolute top-0 right-1"
                                        />
                                    </Marker>
                                </MapTrip>
                                <Box
                                    bgColor={'white'}
                                    position={'absolute'}
                                    bottom={4}
                                    left={'50%'}
                                    transform={'translateX(-50%)'}
                                    py={3}
                                    px={4}
                                    rounded={'lg'}
                                    className="drop-shadow-md"
                                >
                                    <Text fontWeight={500} fontSize={'16px'}>
                                        Nơi chúng ta sẽ gặp nhau
                                    </Text>
                                    <Text fontWeight={400} fontSize={'14px'} noOfLines={2}>
                                        {data.destination}
                                    </Text>
                                </Box>
                            </Box>
                            <Collapse startingHeight={70} in={show.cp5}>
                                <Text className="pt-6">
                                    <div dangerouslySetInnerHTML={{ __html: `${data?.destinationDescription}` }}></div>
                                </Text>
                            </Collapse>
                            <Button size="sm" variant={'link'} onClick={() => handleToggle('cp5')} mt="1rem">
                                {show.cp5 ? 'Xem thêm' : 'Ẩn bớt'}
                            </Button>
                        </Box>
                        <Box py={12}>
                            {dataReview && dataReview.length > 0 ? (
                                <Comment data={dataReview} averageRating={data.avgRating} />
                            ) : (
                                <Heading
                                    lineHeight={1.4}
                                    as="h2"
                                    fontSize={'22px'}
                                    fontWeight={'600'}
                                    className="mb-6 px-3 flex items-center"
                                >
                                    <Text className="ml-2 ">Chưa có đánh giá</Text>
                                </Heading>
                            )}
                        </Box>
                        <Box py={12}>
                            <section>
                                <Heading lineHeight={1.4} as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1}>
                                    Chọn trong số các ngày còn trống
                                </Heading>
                                <Text mb={6} className="text-base  text-gray-400">
                                    Có sẵn {jsxCardBookTime.length}
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
                                        {jsxCardBookTime.slice(0, 15).map(
                                            (time: any, index: number) =>
                                                time.isDeleted === false && (
                                                    <SwiperSlide key={time?.timeId}>
                                                        <CardSelectDay
                                                            timeId={time?.timeId}
                                                            start_time={time?.start_time}
                                                            end_time={time?.end_time}
                                                            day={time?.day}
                                                            price={data?.priceOnePerson}
                                                        />
                                                    </SwiperSlide>
                                                ),
                                        )}
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
                        {/* <Box py={12}>
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
                        </Box> */}
                        {/* <Box py={12}>
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
                                        <SwiperSlide>
                                    <CardItem className="h-[370px]" />
                                </SwiperSlide>
                                    </Swiper>
                                </div>
                            </section>
                        </Box> */}
                    </VStack>
                    <AllPictureModal isOpen={isModalOpen} onClose={onModalClose} data={data?.images} />
                    <AllDayModal isOpen={isModalOpen2} onClose={onModalClose2} price={data.priceOnePerson} />
                </Flex>
            ) : (
                <div></div>
            )}
        </>
    );
}
export default Tours;
