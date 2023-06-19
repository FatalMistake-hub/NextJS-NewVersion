import { Box, Menu, Text, Stack, Button, Heading, MenuList, MenuButton, useColorModeValue, Flex, Container } from '@chakra-ui/react';
import ChatInput from '@components/Chat/ChatInput';
import Message from '@components/Chat/Message';
import Participants from '@components/Chat/Participants';
import { HeaderHosting } from '@components/layouts/common/HeaderHosting';
import { HeaderNoSearch } from '@components/layouts/common/HeaderNoSearch';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactElement } from 'react';
import { BiChevronDown } from 'react-icons/bi';
const HostingInbox = () => {
    const btnHover = useColorModeValue('#fff', '#222');
    const btnBg = useColorModeValue('#fafafa', '#262626');

    // @ts-ignore
    // const convoDescription = conversation.attributes.description;

    return (
        <Flex direction="column" justify="space-between" h="100vh">
            <Container pt={'130px'} pb={8} px={8} maxW="full" overflowY="hidden" overflowX="hidden">
                <Stack maxH={{ base: 'calc(100vh - 150px )' }}>
                    <Stack align="center" direction="row" justifyContent="space-between">
                        <Stack direction="row" align="center">
                            <AnimatePresence key={'a'}>
                                <motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} initial={{ opacity: 0, y: -10 }}>
                                    <Stack spacing={0}>
                                        <Heading lineHeight={1.4} as="h1" fontSize={'22px'} fontWeight={'700'}>
                                            Michelle & Michael
                                        </Heading>

                                        <Text opacity={0.8} fontSize="16px">
                                            Thời gian phản hồi: 1 giờ
                                        </Text>
                                    </Stack>
                                </motion.div>
                            </AnimatePresence>
                        </Stack>
                        <Stack alignItems="flex-end" spacing={1} direction={'row'}>
                            {/* <EditConvo /> */}
                            <Box>
                                <Menu>
                                    <MenuButton
                                        bg={btnBg}
                                        shadow="sm"
                                        as={Button}
                                        _hover={{
                                            bg: btnHover,
                                        }}
                                        _active={{
                                            bg: btnHover,
                                        }}
                                        size="sm"
                                        rightIcon={<BiChevronDown />}
                                    >
                                        Actions
                                    </MenuButton>
                                    <MenuList px={2} fontSize="sm" bg={useColorModeValue('#fafafa', '#262626')}>
                                        {/* <AddParticipant />
                                <LeaveRoom />
                                        <DeleteConvo /> */}
                                    </MenuList>
                                </Menu>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack mt={6} position="relative" minH={'calc(100vh - 250px )'} direction={'row'}>
                        <Participants />
                        <Message />
                        {/* <ChatInput /> */}
                    </Stack>
                </Stack>
            </Container>
        </Flex>
    );
};
HostingInbox.requireAuth = true;

export default HostingInbox;
HostingInbox.getLayout = function (page: ReactElement) {
    return (
        <>
            <HeaderHosting />
            {page}
        </>
    );
}
