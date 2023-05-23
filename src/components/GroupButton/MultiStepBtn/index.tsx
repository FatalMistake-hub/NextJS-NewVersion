import ProgressBar from '@ramonak/react-progress-bar';
import { ButtonGroup, Flex, Button, toast, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from 'src/redux/hook';
import { selectBecomeHost, SET_btnSTATUS, SET_STEP } from 'src/redux/slice/becomeHostSlice';
const END_STEP = 10;
const START_STEP = 1;
const MultiStepBtn = () => {
    const { step, btnStatus } = useAppSelector(selectBecomeHost);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading1, setIsLoading1] = useState(false);
    const [progress, setProgress] = useState((step)/END_STEP*100);
    const toast = useToast();

    return (
        <div className="w-screen fixed bottom-0 bg-white h-fit ">
            <ProgressBar
                completed={progress}
                height={'6px'}
                className="wrapper"
                bgColor="black"
                labelColor="black"
                transitionDuration="1.5s"
                transitionTimingFunction="linear"
            />

            <ButtonGroup w="100%" py={4} px={12}>
                <Flex w="100%" justifyContent="space-between">
                    <Flex>
                        {!(step === START_STEP) && (
                            <Button
                                isLoading={isLoading1}
                                size={'lg'}
                                onClick={() => {
                                    dispatch(SET_STEP(step - 1));
                                    dispatch(SET_btnSTATUS(false));

                                    setProgress(progress - Number((100 / END_STEP).toFixed(2)));
                                    setIsLoading1(true);
                                    setTimeout(() => {
                                        setIsLoading1(false);
                                    }, 1000);
                                }}
                                color={'black'}
                                variant="link"
                            >
                                Quay lại
                            </Button>
                        )}
                    </Flex>
                    {step === END_STEP ? (
                        <Button
                            size={'lg'}
                            isDisabled={btnStatus}
                            colorScheme="teal"
                            onClick={() => {
                                toast({
                                    title: 'Account created.',
                                    description: "We've created your account for you.",
                                    status: 'success',
                                    duration: 3000,
                                    isClosable: true,
                                });
                            }}
                        >
                            Hoàn tất
                        </Button>
                    ) : (
                        <Button
                            isLoading={isLoading}
                            w="8rem"
                            size={'lg'}
                            isDisabled={btnStatus}
                            onClick={() => {
                                dispatch(SET_STEP(step + 1));
                                dispatch(SET_btnSTATUS(false));
                                if (step === END_STEP) {
                                    setProgress(100);
                                } else {
                                    setProgress(progress + Number((100 / END_STEP).toFixed(2)));
                                }
                                setIsLoading(true);
                                setTimeout(() => {
                                    setIsLoading(false);
                                }, 1000);
                            }}
                            bgColor={!(step === START_STEP) ? 'black' : ''}
                            colorScheme={step === START_STEP ? 'teal' : ''}
                        >
                            {step === START_STEP ? 'Bắt đầu' : 'Tiếp theo'}
                        </Button>
                    )}
                </Flex>
            </ButtonGroup>
        </div>
    );
};

export default MultiStepBtn;
