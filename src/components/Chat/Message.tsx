import { BiDownArrowAlt, BiGhost } from 'react-icons/bi';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Button, IconButton, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import useBgGradient from 'src/hooks/style/useBgGradint';
import ChatInput from './ChatInput';
function ScrollBottom({ messages }: { messages: any }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        scrollRef?.current?.scrollIntoView();
    }, [messages]);
    return <div ref={scrollRef} />;
}
const Message = () => {
    const bgGradient = useBgGradient();
    const mainMsgBg = useColorModeValue('#fafafa', '#141414');
    const secondaryMsgBg = useColorModeValue('gray.100', '#202020');
    return (
        <Stack
            py={4}
            w="100%"
            rounded="md"
            // ref={msgsContainer}
            bgImage={bgGradient}
            // onScroll={() => handleScroll()}
            // justify={'center'}
            // justify={msgsPresent ? undefined : 'center'}
            minH={{ base: 'calc(100vh - 320px)', sm: '100%' }}
            position="relative"
        >
            <AnimatePresence initial={false}>
                <motion.div
                    // key={isVisible ? 'animate' : 'exit'}
                    key={'animate'}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0, x: 10 }}
                    initial={{ opacity: 0, x: 10 }}
                    style={{
                        zIndex: 1,
                        right: '1rem',
                        bottom: '5rem',
                        position: 'absolute',
                    }}
                >
                    {/* {isVisible && ( */}
                    <IconButton
                        size="sm"
                        shadow="xl"
                        rounded="full"
                        colorScheme="teal"
                        icon={<BiDownArrowAlt />}
                        aria-label="Scroll bottom"
                        // onClick={() => handleClick()}
                    />
                    {/* )} */}
                </motion.div>
            </AnimatePresence>
            <Stack position={'relative'} height={'full'} overflowY="auto" overflowX="hidden" px={4} pb={4}>
                {/* <ScrollBottomBtn isVisible={showScrollArrow} container={elContainer} /> */}
                {/* {msgsPresent ? ( */}
                <>
                    {/* {paginator?.hasPrevPage && ( */}
                    {/* <Stack align="flex-end">
                                <Button isLoading={isLoading} onClick={() => getPrevMsgs()}>
                                    Load more...
                                </Button>
                            </Stack> */}
                    {/* )} */}
                    {/* {messages.map((msg: Message, index) => {
                            const isAuthor = msg.author === currentUser;
                            return ( */}
                    <motion.div
                        // key={msg.sid}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        // initial={{ opacity: 0, x: isAuthor ? 80 : -80 }}
                        initial={{ opacity: 0, x: -80 }}
                    >
                        {/* <ChatBubble message={msg} ref={index === 0 ? firstMsgRef : undefined} /> */}
                        {/* <Stack py={2} ref={ref} alignItems="center" direction={isAuthor ? 'row-reverse' : 'row'}> */}
                        <Stack py={2} alignItems="center" direction={'row'}>
                            <Avatar size="md" shadow="xl" color="#fafafa" src={'https://bit.ly/dan-abramov'} name={'An'} bg={'gray.800'} />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={mainMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* {isGif || isImage ? (
                                        <ImageViewer name={isGif ? 'Giphy' : rawMedia?.filename} url={isImage ? mediaUrl : (body as string)} />
                                    ) : (
                                        <> */}
                                    {/* {!isAudio && <Text wordBreak="break-word">{body}</Text>} */}
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        hello
                                    </Text>
                                    {/* {isAudio && (
                                                <Box py={2}>
                                                    {mediaUrl ? (
                                                        // <audio controls>
                                                        //   <source src={mediaUrl} type="audio/wav" />
                                                        //   Your browser does not support the audio element.
                                                        // </audio>
                                                        <Center w={120} h={75}>
                                                            <AudioPlayer audioUrl={mediaUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Center w={120} h={75} rounded="lg" bg="#242424">
                                                            <Spinner />
                                                        </Center>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )} */}

                                    {/* {isAuthor && <DeleteMsgMenu message={message} />} */}
                                </Stack>
                                <Box>
                                    {/* {dateCreated && ( */}
                                    <Text fontSize={'12px'} opacity={0.35}>
                                        May 14, 2023, 02:05
                                    </Text>
                                    {/* )} */}
                                    {/* {!isAuthor && ( */}
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        friendlyName
                                    </Text>
                                    {/* )} */}
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack py={2} alignItems="center" direction={'row-reverse'}>
                            <Avatar size="md" shadow="xl" color="#fafafa" src={'https://bit.ly/dan-abramov'} name={'An'} bg={'gray.800'} />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={mainMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* {isGif || isImage ? (
                                        <ImageViewer name={isGif ? 'Giphy' : rawMedia?.filename} url={isImage ? mediaUrl : (body as string)} />
                                    ) : (
                                        <> */}
                                    {/* {!isAudio && <Text wordBreak="break-word">{body}</Text>} */}
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        hello
                                    </Text>
                                    {/* {isAudio && (
                                                <Box py={2}>
                                                    {mediaUrl ? (
                                                        // <audio controls>
                                                        //   <source src={mediaUrl} type="audio/wav" />
                                                        //   Your browser does not support the audio element.
                                                        // </audio>
                                                        <Center w={120} h={75}>
                                                            <AudioPlayer audioUrl={mediaUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Center w={120} h={75} rounded="lg" bg="#242424">
                                                            <Spinner />
                                                        </Center>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )} */}

                                    {/* {isAuthor && <DeleteMsgMenu message={message} />} */}
                                </Stack>
                                <Box>
                                    {/* {dateCreated && ( */}
                                    <Text fontSize={'12px'} opacity={0.35}>
                                        May 14, 2023, 02:05
                                    </Text>
                                    {/* )} */}
                                    {/* {!isAuthor && ( */}
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        friendlyName
                                    </Text>
                                    {/* )} */}
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack py={2} alignItems="center" direction={'row-reverse'}>
                            <Avatar size="md" shadow="xl" color="#fafafa" src={'https://bit.ly/dan-abramov'} name={'An'} bg={'gray.800'} />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={mainMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* {isGif || isImage ? (
                                        <ImageViewer name={isGif ? 'Giphy' : rawMedia?.filename} url={isImage ? mediaUrl : (body as string)} />
                                    ) : (
                                        <> */}
                                    {/* {!isAudio && <Text wordBreak="break-word">{body}</Text>} */}
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        hello
                                    </Text>
                                    {/* {isAudio && (
                                                <Box py={2}>
                                                    {mediaUrl ? (
                                                        // <audio controls>
                                                        //   <source src={mediaUrl} type="audio/wav" />
                                                        //   Your browser does not support the audio element.
                                                        // </audio>
                                                        <Center w={120} h={75}>
                                                            <AudioPlayer audioUrl={mediaUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Center w={120} h={75} rounded="lg" bg="#242424">
                                                            <Spinner />
                                                        </Center>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )} */}

                                    {/* {isAuthor && <DeleteMsgMenu message={message} />} */}
                                </Stack>
                                <Box>
                                    {/* {dateCreated && ( */}
                                    <Text fontSize={'12px'} opacity={0.35}>
                                        May 14, 2023, 02:05
                                    </Text>
                                    {/* )} */}
                                    {/* {!isAuthor && ( */}
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        friendlyName
                                    </Text>
                                    {/* )} */}
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack py={2} alignItems="center" direction={'row'}>
                            <Avatar size="md" shadow="xl" color="#fafafa" src={'https://bit.ly/dan-abramov'} name={'An'} bg={'gray.800'} />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={mainMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* {isGif || isImage ? (
                                        <ImageViewer name={isGif ? 'Giphy' : rawMedia?.filename} url={isImage ? mediaUrl : (body as string)} />
                                    ) : (
                                        <> */}
                                    {/* {!isAudio && <Text wordBreak="break-word">{body}</Text>} */}
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        hello
                                    </Text>
                                    {/* {isAudio && (
                                                <Box py={2}>
                                                    {mediaUrl ? (
                                                        // <audio controls>
                                                        //   <source src={mediaUrl} type="audio/wav" />
                                                        //   Your browser does not support the audio element.
                                                        // </audio>
                                                        <Center w={120} h={75}>
                                                            <AudioPlayer audioUrl={mediaUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Center w={120} h={75} rounded="lg" bg="#242424">
                                                            <Spinner />
                                                        </Center>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )} */}

                                    {/* {isAuthor && <DeleteMsgMenu message={message} />} */}
                                </Stack>
                                <Box>
                                    {/* {dateCreated && ( */}
                                    <Text fontSize={'12px'} opacity={0.35}>
                                        May 14, 2023, 02:05
                                    </Text>
                                    {/* )} */}
                                    {/* {!isAuthor && ( */}
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        friendlyName
                                    </Text>
                                    {/* )} */}
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack py={2} alignItems="center" direction={'row'}>
                            <Avatar size="md" shadow="xl" color="#fafafa" src={'https://bit.ly/dan-abramov'} name={'An'} bg={'gray.800'} />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={mainMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* {isGif || isImage ? (
                                        <ImageViewer name={isGif ? 'Giphy' : rawMedia?.filename} url={isImage ? mediaUrl : (body as string)} />
                                    ) : (
                                        <> */}
                                    {/* {!isAudio && <Text wordBreak="break-word">{body}</Text>} */}
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        hello
                                    </Text>
                                    {/* {isAudio && (
                                                <Box py={2}>
                                                    {mediaUrl ? (
                                                        // <audio controls>
                                                        //   <source src={mediaUrl} type="audio/wav" />
                                                        //   Your browser does not support the audio element.
                                                        // </audio>
                                                        <Center w={120} h={75}>
                                                            <AudioPlayer audioUrl={mediaUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Center w={120} h={75} rounded="lg" bg="#242424">
                                                            <Spinner />
                                                        </Center>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )} */}

                                    {/* {isAuthor && <DeleteMsgMenu message={message} />} */}
                                </Stack>
                                <Box>
                                    {/* {dateCreated && ( */}
                                    <Text fontSize={'12px'} opacity={0.35}>
                                        May 14, 2023, 02:05
                                    </Text>
                                    {/* )} */}
                                    {/* {!isAuthor && ( */}
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        friendlyName
                                    </Text>
                                    {/* )} */}
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack py={2} alignItems="center" direction={'row'}>
                            <Avatar size="md" shadow="xl" color="#fafafa" src={'https://bit.ly/dan-abramov'} name={'An'} bg={'gray.800'} />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={mainMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* {isGif || isImage ? (
                                        <ImageViewer name={isGif ? 'Giphy' : rawMedia?.filename} url={isImage ? mediaUrl : (body as string)} />
                                    ) : (
                                        <> */}
                                    {/* {!isAudio && <Text wordBreak="break-word">{body}</Text>} */}
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        hello
                                    </Text>
                                    {/* {isAudio && (
                                                <Box py={2}>
                                                    {mediaUrl ? (
                                                        // <audio controls>
                                                        //   <source src={mediaUrl} type="audio/wav" />
                                                        //   Your browser does not support the audio element.
                                                        // </audio>
                                                        <Center w={120} h={75}>
                                                            <AudioPlayer audioUrl={mediaUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Center w={120} h={75} rounded="lg" bg="#242424">
                                                            <Spinner />
                                                        </Center>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )} */}

                                    {/* {isAuthor && <DeleteMsgMenu message={message} />} */}
                                </Stack>
                                <Box>
                                    {/* {dateCreated && ( */}
                                    <Text fontSize={'12px'} opacity={0.35}>
                                        May 14, 2023, 02:05
                                    </Text>
                                    {/* )} */}
                                    {/* {!isAuthor && ( */}
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        friendlyName
                                    </Text>
                                    {/* )} */}
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack py={2} alignItems="center" direction={'row-reverse'}>
                            <Avatar size="md" shadow="xl" color="#fafafa" src={'https://bit.ly/dan-abramov'} name={'An'} bg={'gray.800'} />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={mainMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* {isGif || isImage ? (
                                        <ImageViewer name={isGif ? 'Giphy' : rawMedia?.filename} url={isImage ? mediaUrl : (body as string)} />
                                    ) : (
                                        <> */}
                                    {/* {!isAudio && <Text wordBreak="break-word">{body}</Text>} */}
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        hello
                                    </Text>
                                    {/* {isAudio && (
                                                <Box py={2}>
                                                    {mediaUrl ? (
                                                        // <audio controls>
                                                        //   <source src={mediaUrl} type="audio/wav" />
                                                        //   Your browser does not support the audio element.
                                                        // </audio>
                                                        <Center w={120} h={75}>
                                                            <AudioPlayer audioUrl={mediaUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Center w={120} h={75} rounded="lg" bg="#242424">
                                                            <Spinner />
                                                        </Center>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )} */}

                                    {/* {isAuthor && <DeleteMsgMenu message={message} />} */}
                                </Stack>
                                <Box>
                                    {/* {dateCreated && ( */}
                                    <Text fontSize={'12px'} opacity={0.35}>
                                        May 14, 2023, 02:05
                                    </Text>
                                    {/* )} */}
                                    {/* {!isAuthor && ( */}
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        friendlyName
                                    </Text>
                                    {/* )} */}
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack py={2} alignItems="center" direction={'row-reverse'}>
                            <Avatar size="md" shadow="xl" color="#fafafa" src={'https://bit.ly/dan-abramov'} name={'An'} bg={'gray.800'} />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={mainMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* {isGif || isImage ? (
                                        <ImageViewer name={isGif ? 'Giphy' : rawMedia?.filename} url={isImage ? mediaUrl : (body as string)} />
                                    ) : (
                                        <> */}
                                    {/* {!isAudio && <Text wordBreak="break-word">{body}</Text>} */}
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        hello
                                    </Text>
                                    {/* {isAudio && (
                                                <Box py={2}>
                                                    {mediaUrl ? (
                                                        // <audio controls>
                                                        //   <source src={mediaUrl} type="audio/wav" />
                                                        //   Your browser does not support the audio element.
                                                        // </audio>
                                                        <Center w={120} h={75}>
                                                            <AudioPlayer audioUrl={mediaUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Center w={120} h={75} rounded="lg" bg="#242424">
                                                            <Spinner />
                                                        </Center>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )} */}

                                    {/* {isAuthor && <DeleteMsgMenu message={message} />} */}
                                </Stack>
                                <Box>
                                    {/* {dateCreated && ( */}
                                    <Text fontSize={'12px'} opacity={0.35}>
                                        May 14, 2023, 02:05
                                    </Text>
                                    {/* )} */}
                                    {/* {!isAuthor && ( */}
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        friendlyName
                                    </Text>
                                    {/* )} */}
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack py={2} alignItems="center" direction={'row-reverse'}>
                            <Avatar size="md" shadow="xl" color="#fafafa" src={'https://bit.ly/dan-abramov'} name={'An'} bg={'gray.800'} />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={mainMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* {isGif || isImage ? (
                                        <ImageViewer name={isGif ? 'Giphy' : rawMedia?.filename} url={isImage ? mediaUrl : (body as string)} />
                                    ) : (
                                        <> */}
                                    {/* {!isAudio && <Text wordBreak="break-word">{body}</Text>} */}
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        hello
                                    </Text>
                                    {/* {isAudio && (
                                                <Box py={2}>
                                                    {mediaUrl ? (
                                                        // <audio controls>
                                                        //   <source src={mediaUrl} type="audio/wav" />
                                                        //   Your browser does not support the audio element.
                                                        // </audio>
                                                        <Center w={120} h={75}>
                                                            <AudioPlayer audioUrl={mediaUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Center w={120} h={75} rounded="lg" bg="#242424">
                                                            <Spinner />
                                                        </Center>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )} */}

                                    {/* {isAuthor && <DeleteMsgMenu message={message} />} */}
                                </Stack>
                                <Box>
                                    {/* {dateCreated && ( */}
                                    <Text fontSize={'12px'} opacity={0.35}>
                                        May 14, 2023, 02:05
                                    </Text>
                                    {/* )} */}
                                    {/* {!isAuthor && ( */}
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        friendlyName
                                    </Text>
                                    {/* )} */}
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack py={2} alignItems="center" direction={'row-reverse'}>
                            <Avatar size="md" shadow="xl" color="#fafafa" src={'https://bit.ly/dan-abramov'} name={'An'} bg={'gray.800'} />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={mainMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* {isGif || isImage ? (
                                        <ImageViewer name={isGif ? 'Giphy' : rawMedia?.filename} url={isImage ? mediaUrl : (body as string)} />
                                    ) : (
                                        <> */}
                                    {/* {!isAudio && <Text wordBreak="break-word">{body}</Text>} */}
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        hello
                                    </Text>
                                    {/* {isAudio && (
                                                <Box py={2}>
                                                    {mediaUrl ? (
                                                        // <audio controls>
                                                        //   <source src={mediaUrl} type="audio/wav" />
                                                        //   Your browser does not support the audio element.
                                                        // </audio>
                                                        <Center w={120} h={75}>
                                                            <AudioPlayer audioUrl={mediaUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Center w={120} h={75} rounded="lg" bg="#242424">
                                                            <Spinner />
                                                        </Center>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )} */}

                                    {/* {isAuthor && <DeleteMsgMenu message={message} />} */}
                                </Stack>
                                <Box>
                                    {/* {dateCreated && ( */}
                                    <Text fontSize={'12px'} opacity={0.35}>
                                        May 14, 2023, 02:05
                                    </Text>
                                    {/* )} */}
                                    {/* {!isAuthor && ( */}
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        friendlyName
                                    </Text>
                                    {/* )} */}
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack py={2} alignItems="center" direction={'row-reverse'}>
                            <Avatar size="md" shadow="xl" color="#fafafa" src={'https://bit.ly/dan-abramov'} name={'An'} bg={'gray.800'} />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={mainMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* {isGif || isImage ? (
                                        <ImageViewer name={isGif ? 'Giphy' : rawMedia?.filename} url={isImage ? mediaUrl : (body as string)} />
                                    ) : (
                                        <> */}
                                    {/* {!isAudio && <Text wordBreak="break-word">{body}</Text>} */}
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        hello
                                    </Text>
                                    {/* {isAudio && (
                                                <Box py={2}>
                                                    {mediaUrl ? (
                                                        // <audio controls>
                                                        //   <source src={mediaUrl} type="audio/wav" />
                                                        //   Your browser does not support the audio element.
                                                        // </audio>
                                                        <Center w={120} h={75}>
                                                            <AudioPlayer audioUrl={mediaUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Center w={120} h={75} rounded="lg" bg="#242424">
                                                            <Spinner />
                                                        </Center>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )} */}

                                    {/* {isAuthor && <DeleteMsgMenu message={message} />} */}
                                </Stack>
                                <Box>
                                    {/* {dateCreated && ( */}
                                    <Text fontSize={'12px'} opacity={0.35}>
                                        May 14, 2023, 02:05
                                    </Text>
                                    {/* )} */}
                                    {/* {!isAuthor && ( */}
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        friendlyName
                                    </Text>
                                    {/* )} */}
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack py={2} alignItems="center" direction={'row-reverse'}>
                            <Avatar size="md" shadow="xl" color="#fafafa" src={'https://bit.ly/dan-abramov'} name={'An'} bg={'gray.800'} />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={mainMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* {isGif || isImage ? (
                                        <ImageViewer name={isGif ? 'Giphy' : rawMedia?.filename} url={isImage ? mediaUrl : (body as string)} />
                                    ) : (
                                        <> */}
                                    {/* {!isAudio && <Text wordBreak="break-word">{body}</Text>} */}
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        hello
                                    </Text>
                                    {/* {isAudio && (
                                                <Box py={2}>
                                                    {mediaUrl ? (
                                                        // <audio controls>
                                                        //   <source src={mediaUrl} type="audio/wav" />
                                                        //   Your browser does not support the audio element.
                                                        // </audio>
                                                        <Center w={120} h={75}>
                                                            <AudioPlayer audioUrl={mediaUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Center w={120} h={75} rounded="lg" bg="#242424">
                                                            <Spinner />
                                                        </Center>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )} */}

                                    {/* {isAuthor && <DeleteMsgMenu message={message} />} */}
                                </Stack>
                                <Box>
                                    {/* {dateCreated && ( */}
                                    <Text fontSize={'12px'} opacity={0.35}>
                                        May 14, 2023, 02:05
                                    </Text>
                                    {/* )} */}
                                    {/* {!isAuthor && ( */}
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        friendlyName
                                    </Text>
                                    {/* )} */}
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack py={2} alignItems="center" direction={'row'}>
                            <Avatar size="md" shadow="xl" color="#fafafa" src={'https://bit.ly/dan-abramov'} name={'An'} bg={'gray.800'} />
                            <Stack p={2} px={4} minW={100} maxW={400} shadow="xl" rounded="lg" bg={mainMsgBg}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* {isGif || isImage ? (
                                        <ImageViewer name={isGif ? 'Giphy' : rawMedia?.filename} url={isImage ? mediaUrl : (body as string)} />
                                    ) : (
                                        <> */}
                                    {/* {!isAudio && <Text wordBreak="break-word">{body}</Text>} */}
                                    <Text fontSize={'16px'} wordBreak="break-word">
                                        hello
                                    </Text>
                                    {/* {isAudio && (
                                                <Box py={2}>
                                                    {mediaUrl ? (
                                                        // <audio controls>
                                                        //   <source src={mediaUrl} type="audio/wav" />
                                                        //   Your browser does not support the audio element.
                                                        // </audio>
                                                        <Center w={120} h={75}>
                                                            <AudioPlayer audioUrl={mediaUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Center w={120} h={75} rounded="lg" bg="#242424">
                                                            <Spinner />
                                                        </Center>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )} */}

                                    {/* {isAuthor && <DeleteMsgMenu message={message} />} */}
                                </Stack>
                                <Box>
                                    {/* {dateCreated && ( */}
                                    <Text fontSize={'12px'} opacity={0.35}>
                                        May 14, 2023, 02:05
                                    </Text>
                                    {/* )} */}
                                    {/* {!isAuthor && ( */}
                                    <Text fontSize={'12px'} opacity={0.35} fontWeight={'500'}>
                                        friendlyName
                                    </Text>
                                    {/* )} */}
                                </Box>
                            </Stack>
                        </Stack>
                    </motion.div>
                    {/* );
                        })} */}

                    {/* {scrollBottom && <ScrollBottom messages={messages} />} */}
                    <ScrollBottom messages={'aaaa'} />
                </>
            </Stack>
            <AnimatePresence initial={false}>
                <motion.div
                    // key={usersTyping.length > 0 ? 'animate' : 'exit'}
                    key={'animate'}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0, x: -10 }}
                    initial={{ opacity: 0, x: -10 }}
                    style={{
                        bottom: '4rem',
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
                            src={'https://bit.ly/dan-abramov'}
                            icon={<BiGhost size={16} color="#fafafa" />}
                            name={'AN'}
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
                            <Text fontSize={'12px'}>Hello .....</Text>
                        </Stack>
                    </Stack>
                </motion.div>
            </AnimatePresence>
            <Stack px={4}>
                <ChatInput />
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
