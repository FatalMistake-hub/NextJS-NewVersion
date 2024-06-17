import { Box, Stack, Badge, Heading, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useCallback } from 'react';

import Participant from './Participant';
import { motion } from 'framer-motion';

export default function Participants() {
    const mainBg = useColorModeValue('#ededed99', '#ffffff5a');

    const { data: session } = useSession();
    const router = useRouter();

    return (
        <Stack spacing={0} w={300}>
            <Stack
                py={2}
                bg={mainBg}
                borderTopEndRadius="md"
                borderTopLeftRadius="md"
                direction={{ base: 'row', sm: 'column' }}
                alignItems={{ base: 'center', sm: 'flex-start' }}
            >
                <Stack direction="row" align="center" pt={{ base: 0, sm: 2 }} px={4}>
                    <Tooltip label="Click to refresh" fontSize="xs" rounded="lg">
                        <Heading lineHeight={1.4} as="h2" fontSize={'18px'} fontWeight={'600'}>
                            Tin nhắn
                        </Heading>
                    </Tooltip>
                    <Badge colorScheme="teal">2</Badge>
                </Stack>
            </Stack>
            <Box
                px={4}
                bg={mainBg}
                overflowY="auto"
                py={3}
                borderBottomEndRadius="md"
                borderBottomLeftRadius="md"
                // display={{ base: 'flex', sm: 'inherit' }}
                height={{ base: undefined, sm: 'calc(100% - 40px)' }}
            >
                <motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} initial={{ opacity: 0, y: -10 }}>
                    <Stack direction={{ base: 'row', sm: 'column' }} align={{ base: 'center', sm: 'flex-start' }}>
                        <Participant />
                    </Stack>
                </motion.div>
            </Box>
        </Stack>
    );
}
