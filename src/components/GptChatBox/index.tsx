import {
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Box,
} from '@chakra-ui/react';
import Message from '@components/Chat/Message';
import animationData from '@public/assets/animation/59839-commnet-animation.json';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useRef } from 'react';
function GptChatBox() {
    const locationRef = useRef<LottieRefCurrentProps | null>(null);

    return (
        <div className="">
            <Popover isLazy placement="top-end">
                <PopoverTrigger>
                    <Box w={20}>
                        <Lottie
                            lottieRef={locationRef}
                            animationData={animationData}
                            onLoopComplete={() => {
                                // locationRef.current?.setDirection(-1);
                                locationRef.current?.play();
                            }}
                            // loop={false}
                        />
                    </Box>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverHeader fontWeight="semibold">Popover placement</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <Message />
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default GptChatBox;
