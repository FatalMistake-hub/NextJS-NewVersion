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
    console.log('reRender');
    return (
        <div className="fixed bottom-6 right-8 drop-shadow-xl z-50">
            <Popover isLazy placement="top-end" closeOnBlur={false}>
                <PopoverTrigger>
                    <Box w={20} className="drop-shadow-xl ">
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
                <PopoverContent rounded={'2xl'} w={'700px'} bgColor={'white'}>
                    <PopoverHeader border="0" fontWeight="semibold" px='4'>
                       Trò chuyện với BotGPT
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton mt={2} mr={1} />
                    <PopoverBody px={3} pb={3} pt={1} className="drop-shadow-md">
                        <Message />
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default GptChatBox;
