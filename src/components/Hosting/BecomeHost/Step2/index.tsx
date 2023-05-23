import { Box, VStack, Text, Heading } from '@chakra-ui/react';
import MultiStepBtn from '@components/GroupButton/MultiStepBtn';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useRef } from 'react';
import animationData from '@public/assets/animation/26540-blogging-writing-typing.json';
const BecomeHostStep2 = () => {
    const locationRef = useRef<LottieRefCurrentProps | null>(null);
    return (
        <>
            <div className="w-full justify-center items-center flex min-h-[calc(100vh-176px)] px-20">
                <VStack w={'575px'} align={'left'} gap={2}>
                    <Text fontSize={'18px'} fontWeight={'600'}>
                        Bước 2
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
                        Làm cho trải nghiệm của bạn trở nên nổi bật
                    </Heading>
                    <Text fontSize={'18px'} fontWeight={'400'}>
                        Ở bước này, bạn sẽ soạn tiêu đề và nội dung mô tả. Sau đó, bạn sẽ thêm một số thông tin cùng với 5 bức ảnh trở lên .
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

export default BecomeHostStep2;
