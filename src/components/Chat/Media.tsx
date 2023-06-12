import { SimpleGrid, IconButton, useDisclosure, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { type } from 'os';

import { useState } from 'react';
import { BiImage, BiImages, BiMicrophone, BiPaperclip } from 'react-icons/bi';
type Props = {
    className?: string;
};
export default function Media({ className }: Props) {
    const bg = useColorModeValue('#fafafa', '#262626');
    const btnHover = useColorModeValue('#fff', '#222');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnBg = useColorModeValue('#fafafa', '#262626');
    const [isRecording, setIsRecording] = useState<boolean>(false);

    return (
        <SimpleGrid minChildWidth="40px" minWidth={'120x'} className={className} w={'fit-content'}>
            {/* <GifPicker isOpen={isOpen} onClose={onClose} /> */}
            <Tooltip label="Ảnh GIF" placement="top">
                <IconButton
                    size={'md'}
                    variant={'ghost'}
                    colorScheme={'blackAlpha'}
                    rounded={'full'}
                    color={'teal.500'}
                    aria-label="GIF"
                    onClick={onOpen}
                    icon={<BiImages size={20} />}
                >
                    GIF
                </IconButton>
            </Tooltip>
            <Tooltip label="Tải ảnh lên" placement="top">
                <IconButton
                    size={'md'}
                    variant={'ghost'}
                    colorScheme={'blackAlpha'}
                    rounded={'full'}
                    color={'teal.500'}
                    aria-label="IMG"
                    icon={<BiImage size={20} />}
                >
                    Upload image
                </IconButton>
            </Tooltip>
            <Tooltip label="Thêm file đính kèm" placement="top">
                <IconButton
                    size={'md'}
                    variant={'ghost'}
                    colorScheme={'blackAlpha'}
                    rounded={'full'}
                    color={'teal.500'}
                    aria-label="RADIO"
                    icon={<BiPaperclip size={20} />}
                >
                    Record audio
                </IconButton>
            </Tooltip>

            <input type="file" id="file-input" accept="image/*" style={{ display: 'none' }} />
        </SimpleGrid>
    );
}
