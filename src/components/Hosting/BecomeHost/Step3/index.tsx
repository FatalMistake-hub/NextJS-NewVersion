import { Box, VStack, Text, Heading } from '@chakra-ui/react';
import MultiStepBtn from '@components/GroupButton/MultiStepBtn';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useRef } from 'react';
import animationData from '@public/assets/animation/120160-animacion-de-finalizacion.json';
const BecomeHostStep3 = () => {
    const locationRef = useRef<LottieRefCurrentProps | null>(null);
    return (
        <>
            <div className="w-full justify-center items-center flex min-h-[calc(100vh-176px)] px-20">
                <VStack w={'575px'} align={'left'} gap={2}>
                    <Text fontSize={'18px'} fontWeight={'600'}>
                        Bước 3
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
                        Hoàn thiện và đăng
                    </Heading>
                    <Text fontSize={'18px'} fontWeight={'400'}>
                        Cuối cùng, bạn sẽ chọn bắt đầu với việc đặt tiêu đề, sau đó bạn sẽ đặt giá theo cho mỗi người tham gia.Tiến hành đăng mục cho thuê khi bạn đã sẵn sàng.
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

export default BecomeHostStep3;
