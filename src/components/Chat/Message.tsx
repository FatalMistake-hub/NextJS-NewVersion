import { BiGhost } from 'react-icons/bi';
import { Avatar, Box, Button, IconButton, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import useBgGradient from 'src/hooks/style/useBgGradient';
import ChatInput from './ChatInput';
import ScrollBtn from '@components/GroupButton/ScrollBtn';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import useAskGpt from 'src/hooks/guest/gptChat/useAskGpt';
import { useRouter } from 'next/navigation';
import { IGptChat } from 'src/types/chat.type';
import Link from 'next/link';
function ScrollBottom({ messages }: { messages: any }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        scrollRef?.current?.scrollIntoView();
        return () => {};
    }, [messages]);
    return <div ref={scrollRef} />;
}
const Message = () => {
    console.log('render Message');
    let scrollBottom = false;
    const msgsContainer = useRef<HTMLDivElement>(null);
    const bgGradient = useBgGradient();
    const mainMsgBg = useColorModeValue('#fafafa', '#141414');
    const secondaryMsgBg = useColorModeValue('gray.100', '#202020');
    const [showScrollArrow, setShowScrollArrow] = useState(false);
    const elContainer = msgsContainer.current;
    if (elContainer) {
        const { scrollHeight, scrollTop, clientHeight } = msgsContainer.current;
        scrollBottom = scrollTop + clientHeight === scrollHeight;
        // || messages[messages.length - 1].author === currentUser;
    }
    async function handleScroll() {
        if (elContainer) {
            const { scrollHeight, scrollTop, clientHeight } = elContainer;
            const showScroll = scrollTop + clientHeight <= scrollHeight / 1.2;
            if (showScroll && !showScrollArrow) {
                setShowScrollArrow(true);
            }
            if (!showScroll && showScrollArrow) {
                setShowScrollArrow(false);
            }
            // if (scrollTop === 0 && paginator?.hasPrevPage) {
            //   await getPrevMsgs()
            // }
        }
    }

    const { askGpt, isLoading, isError, isSuccess, conversation } = useAskGpt();
    const router = useRouter();

    return (
        <Stack
            w="100%"
            rounded="md"
            bgImage={bgGradient}
            // justify={'center'}
            // justify={msgsPresent ? undefined : 'center'}
            position="relative"
        >
            <Stack
                ref={msgsContainer}
                onScroll={() => handleScroll()}
                position={'relative'}
                overflowY="auto"
                overflowX="hidden"
                px={4}
                py={4}
                minH={'350px'}
                maxH={'55vh'}
                height="100%"
            >
                <div>
                    <motion.div
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        // initial={{ opacity: 0, x: isAuthor ? 80 : -80 }}
                        initial={{ opacity: 0, x: -80 }}
                    >
                        <Stack py={2} alignItems="start" direction={'row'}>
                            <Avatar
                                size="md"
                                shadow="xl"
                                color="#fafafa"
                                src={
                                    'https://images.unsplash.com/photo-1684487747720-1ba29cda82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBib3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
                                }
                                // name={'An'}
                                bg={'gray.800'}
                                mt={2}
                            />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={secondaryMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        Xin chào, tôi là một chatbot dựa trên GPT-3. Tôi có thể trả lời các câu hỏi của bạn về chuyến du
                                        lịch tại website. Bạn có thể hỏi tôi bất cứ điều gì về các tour du lịch, các địa điểm du lịch, các
                                        dịch vụ du lịch, ...
                                    </Text>
                                </Stack>
                                <Box>
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        BotGPT
                                    </Text>
                                </Box>
                            </Stack>
                        </Stack>
                    </motion.div>
                    <ScrollBottom messages={'aaaa'} />
                </div>
                {conversation?.map((msg, index) => (
                    <div key={index}>
                        <motion.div
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            // initial={{ opacity: 0, x: isAuthor ? 80 : -80 }}
                            initial={{ opacity: 0, x: -80 }}
                        >
                            <Stack py={2} alignItems="start" direction={msg.author === 'botGpt' ? 'row' : 'row-reverse'}>
                                <Avatar
                                    size="md"
                                    shadow="xl"
                                    color="#fafafa"
                                    src={
                                        msg.author === 'botGpt'
                                            ? 'https://images.unsplash.com/photo-1684487747720-1ba29cda82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBib3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
                                            : 'https://bit.ly/broken-link'
                                    }
                                    // name={'An'}
                                    bg={'gray.800'}
                                    mt={2}
                                />
                                <Stack p={2} px={4} minW={100} maxW={430} shadow="xl" rounded="lg" bg={secondaryMsgBg}>
                                    <Stack direction="column">
                                        {msg.author === 'botGpt' ? (
                                            <>
                                                <Text fontSize={'16px'} fontWeight={'500'} py={3} px={2} wordBreak="break-word">
                                                    {msg.message.length > 0 ? (
                                                        'BotGPT gợi ý cho bạn 1 số tour sau:'
                                                    ) : (
                                                        <div className="flex items-center justify-between">
                                                            <BiGhost size={60} className="mr-2" />
                                                            Xin lỗi! BotGPT không có câu trả lời cho câu hỏi của bạn
                                                        </div>
                                                    )}
                                                </Text>
                                                {msg.message.length > 0 && (
                                                    <div className="w-full  flex">
                                                        <Swiper
                                                            slidesPerView={1}
                                                            spaceBetween={24}
                                                            pagination={{ clickable: true }}
                                                            modules={[Pagination]}
                                                            style={{ borderRadius: '0.75rem' }}
                                                            className="min-h-[420px]   bg-transparent    "
                                                        >
                                                            {msg.message?.map((item: IGptChat) => (
                                                                <SwiperSlide className="h-full min-w-[400px]   " key={item.tourId}>
                                                                    <Link href={`/tours/${item.tourId}`}>
                                                                        {/* <a target="_blank"> */}
                                                                            <Box
                                                                                minW={'full'}
                                                                                minH={'full'}
                                                                                rounded={'xl'}
                                                                                textAlign={'left'}
                                                                                justifyContent={'space-between'}
                                                                                display={'flex'}
                                                                                flexDirection={'column'}
                                                                                backdropBlur={'2xl'}
                                                                                bgColor={'white'}
                                                                                dropShadow={'xl'}
                                                                                cursor={'pointer'}
                                                                            >
                                                                                <Box w={'full'} minH={'300px'} position={'relative'}>
                                                                                    <Image
                                                                                        src={item.imageMain}
                                                                                        alt={`Picture of `}
                                                                                        layout="fill"
                                                                                        objectFit="cover"
                                                                                        placeholder="blur"
                                                                                        blurDataURL={item.imageMain}
                                                                                        className={'rounded-t-xl'}
                                                                                    />
                                                                                </Box>
                                                                                <Text
                                                                                    px={4}
                                                                                    mt={2}
                                                                                    noOfLines={1}
                                                                                    fontSize={'18px'}
                                                                                    fontWeight={600}
                                                                                >
                                                                                    {item.title}
                                                                                </Text>
                                                                                <div className="flex px-2 flex-row justify-between">
                                                                                    <Text
                                                                                        p={2}
                                                                                        noOfLines={1}
                                                                                        fontSize={'16px'}
                                                                                        fontWeight={600}
                                                                                    >
                                                                                        {item.priceOnePerson.toLocaleString('vi-VN')}₫
                                                                                        /người
                                                                                    </Text>
                                                                                    <Text
                                                                                        p={2}
                                                                                        noOfLines={1}
                                                                                        fontSize={'16px'}
                                                                                        fontWeight={600}
                                                                                    >
                                                                                        {item.categoryName}
                                                                                    </Text>
                                                                                </div>
                                                                            </Box>
                                                                        {/* </a> */}
                                                                    </Link>

                                                                    {/* </div> */}
                                                                </SwiperSlide>
                                                            ))}
                                                        </Swiper>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <Text fontSize={'16px'} wordBreak="break-word">
                                                {msg.message}
                                            </Text>
                                        )}
                                    </Stack>
                                    <Box>
                                        <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                            {msg.author === 'user' ? 'Bạn' : 'BotGPT'}
                                        </Text>
                                    </Box>
                                </Stack>
                            </Stack>
                        </motion.div>
                        <ScrollBottom messages={'aaaa'} />
                    </div>
                ))}
            </Stack>

            <Stack
                px={12}
                pb={6}
                alignItems={'center'}
                position={'relative'}
                backgroundColor={'transparent'}
                flexDirection={'row'}
                justifyContent={'center'}
                w={'full'}
            >
                <ScrollBtn isVisible={showScrollArrow} container={elContainer} />
                {isLoading && (
                    <AnimatePresence initial={false}>
                        <motion.div
                            // key={usersTyping.length > 0 ? 'animate' : 'exit'}
                            key={'animate'}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            exit={{ opacity: 0, x: -10 }}
                            initial={{ opacity: 0, x: -10 }}
                            style={{
                                top: '-2rem',
                                left: '1.5rem',
                                position: 'absolute',
                                zIndex: 1,
                            }}
                        >
                            {/* {usersTyping.length > 0 && <TypingBubble participants={usersTyping} />} */}
                            <Stack py={2} alignItems="center" direction="row" opacity={0.9}>
                                <Avatar
                                    size="xs"
                                    bg="gray.700"
                                    color="#fafafa"
                                    src={
                                        'https://images.unsplash.com/photo-1684487747720-1ba29cda82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBib3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
                                    }
                                    icon={<BiGhost size={16} color="#fafafa" />}
                                    // name={'AN'}
                                />
                                <Stack
                                    p={1}
                                    px={4}
                                    minW={100}
                                    maxW={400}
                                    shadow="lg"
                                    rounded="md"
                                    // bg={useColorModeValue('gray.100', '#202020')}
                                >
                                    <Text fontSize={'12px'}>Đợi một lát, Gpt bot đang trả lời bạn.....</Text>
                                </Stack>
                            </Stack>
                        </motion.div>
                    </AnimatePresence>
                )}

                <ChatInput askGpt={askGpt} isLoading={isLoading} />
                {/* <Media className='px-4'/> */}
            </Stack>
            {/* ) : ( */}
            {/* <Stack alignItems="center">
                    <BiGhost size={40} />
                    <Text textAlign="center" fontWeight={600}>
                        Boo!, there are no messages yet
                    </Text>
                </Stack> */}
            {/* )} */}
        </Stack>
    );
};

export default Message;
