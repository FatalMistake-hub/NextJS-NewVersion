import { Box, Input, Stack, InputGroup, IconButton, FormControl, useColorModeValue, InputRightElement, Textarea } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, FC, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import Media from './Media';
type Props = {
    askGpt: (message: { message: string }) => void;
    isLoading: boolean;
};
const ChatInput: FC<Props> = ({ askGpt, isLoading }) => {
    const [message, setMessage] = useState('');
    const [numLines, setNumLines] = useState(1);

    const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newMessage = e.target.value;
        setMessage(newMessage);
        // Tính số dòng dựa trên kích thước của nội dung
        const lineBreaks = (newMessage.match(/\n/g) || []).length + 1;
        setNumLines(lineBreaks);
    };
    return (
        <Box my={2} width={'100%'} className="relative">
            <form>
                <Stack direction="row">
                    <FormControl isRequired>
                        <InputGroup>
                            <Textarea
                                rounded={'xl'}
                                pl={6}
                                pr={12}
                                value={message}
                                placeholder="Nhập tin nhắn"
                                focusBorderColor="#31979552"
                                isDisabled={isLoading}
                                // onKeyDown={(e) => handleTypingState(e)}
                                bg={useColorModeValue('#fafafa', '#272727')}
                                onChange={handleMessageChange}
                                maxHeight={'200px'}
                                height={`${numLines * 40}px`}
                            />
                            <InputRightElement>{/* <Media /> */}</InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <div className="absolute right-4 bottom-2 rotate-90">
                        <AnimatePresence initial={false}>
                            {message.length > 0 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ rotate: 180, scale: 1 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 260,
                                        damping: 20,
                                    }}
                                >
                                    <IconButton
                                        type="submit"
                                        icon={<BiSend />}
                                        aria-label="Send"
                                        size={'sm'}
                                        isLoading={isLoading}
                                        colorScheme="teal"
                                        rounded={'full'}
                                        disabled={!message.trim()}
                                        onClick={() => {
                                            askGpt({
                                                message: message,
                                            });
                                        }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Stack>
            </form>
        </Box>
    );
};

export default ChatInput;
