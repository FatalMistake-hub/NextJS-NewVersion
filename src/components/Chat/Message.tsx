import { BiGhost } from 'react-icons/bi';
import { Avatar, Box, Button, IconButton, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import useBgGradient from 'src/hooks/style/useBgGradient';
import ChatInput from './ChatInput';
import ScrollBtn from '@components/GroupButton/ScrollBtn';
import Media from './Media';
import useAskGpt from 'src/hooks/guest/gptChat/useAskGpt';
function ScrollBottom({ messages }: { messages: any }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        scrollRef?.current?.scrollIntoView();
        return () => {};
    }, [messages]);
    return <div ref={scrollRef} />;
}
const Message = () => {
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
                maxH={'50vh'}
                height="100%"
            >
                {conversation.map((msg, index) => (
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
                                <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={secondaryMsgBg}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Text fontSize={'16px'} wordBreak="break-word">
                                            {msg.message}
                                        </Text>
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
