import { Box, VStack, Text, Heading } from '@chakra-ui/react';
import MultiStepBtn from '@components/GroupButton/MultiStepBtn';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useRef } from 'react';
import animationData from '@public/assets/animation/29582-looping-idle-location-animation.json';
const BecomeHostStep1 = () => {
    const locationRef = useRef<LottieRefCurrentProps | null>(null);
    return (
        <>
            <div className="w-full justify-center items-center flex h-full px-20">
                <VStack w={'575px'} align={'left'} gap={2}>
                    <Text fontSize={'18px'} fontWeight={'600'}>
                        Bước 1
                    </Text>
                    <Heading
                        lineHeight={'54px'}
                        as="h1"
                        fontSize={'48px'}
                        fontWeight={'600'}
                        width={'full'}
                        noOfLines={2}
                        letterSpacing={'tight'}
                        pb={2}
                    >
                        Chia sẻ thông tin về vị trí tổ chức của bạn cho chúng tôi
                    </Heading>
                    <Text fontSize={'18px'} fontWeight={'400'}>
                        Trong bước này, chúng tôi sẽ hỏi vị trí bạn sẽ tổ chức trải nghiệm ở đâu. Sau đó, hãy cho chúng tôi biết thể loại và số lượng khách có thể tham gia trải nghiệm của bạn.
                    </Text>
                </VStack>
                <Box w={'770px'}>
                    <Lottie
                        lottieRef={locationRef}
                        animationData={animationData}
                        onLoopComplete={() => {
                            locationRef.current?.setDirection(-1);
                            locationRef.current?.play();
                        }}
                        // loop={false}
                    />
                </Box>
            </div>
        </>
    );
};

export default BecomeHostStep1;
