import {
    Avatar,
    Stack,
    Text,

} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { BiCheckShield, BiChevronDown, BiInfoCircle, BiUserX } from 'react-icons/bi';
const Participant = () => {
    return (
        <Stack
            align="center"
            // py={{ base: 0, sm: 1 }}
            spacing={{ base: 1, sm: 2 }}
            direction={{ base: 'column', sm: 'row' }}
        >
            <Avatar h={8} w={8} size="xs" bg="gray.700" color="#fafafa" src={'https://bit.ly/ryan-florence'} name={'Unknown'} />
            <Stack maxW={24} rounded="md">
                <Text fontWeight={600} fontSize={'md'} noOfLines={1}>
                    You
                </Text>
            </Stack>
        </Stack>
    );
};

export default Participant;
