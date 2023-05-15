import { Box, Input, Stack, InputGroup, IconButton, FormControl, useColorModeValue, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { BiSend } from 'react-icons/bi';

const ChatInput = () => {
  const [message, setMessage] = useState('');
    return (
        <Box my={2}>
            <form >
                <Stack direction="row">
                    <FormControl isRequired>
                        <InputGroup>
                            <Input
                                value={message}
                                placeholder="Message"
                                focusBorderColor="#31979552"
                                // onKeyDown={(e) => handleTypingState(e)}
                                bg={useColorModeValue('#fafafa', '#272727')}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <InputRightElement>
                                {/* <Media /> */}
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <IconButton type="submit" icon={<BiSend />} aria-label="Send" colorScheme="teal" disabled={!message.trim()} />
                </Stack>
            </form>
        </Box>
    );
};

export default ChatInput;
