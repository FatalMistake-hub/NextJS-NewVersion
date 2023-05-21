import { Box, ButtonGroup, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import ProgressBar from '@ramonak/react-progress-bar';
import { useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaAirbnb } from 'react-icons/fa';
import BecomeHostStep1 from '@components/Hosting/BecomeHost/Step1';
import BecomeHostStep2 from '@components/Hosting/BecomeHost/Step2';
import BecomeHostStep3 from '@components/Hosting/BecomeHost/Step3';
import { useAppSelector, useAppDispatch } from 'src/redux/hook';
import { selectBecomeHost, SET_STEP } from 'src/redux/slice/becomeHostSlice';
import MultiStepBtn from '@components/GroupButton/MultiStepBtn';
import LocationSt1 from '@components/Hosting/BecomeHost/Step1/Location';
export default function BecomeHost() {
    const { step } = useAppSelector(selectBecomeHost);
    const dispatch = useAppDispatch();
    const logoColor = useColorModeValue('teal.500', 'teal.200');

    function renderSwitch(param: number) {
        switch (param) {
            case 0:
                return <BecomeHostStep1/>;

            case 1:
                return <LocationSt1/>;
            case 2:
                return 'kết thúc';
            case 3:
                return <BecomeHostStep2/>;
            case 4:
                return 'kết thúc';
            case 5:
                return 'kết thúc';
            case 6:
                return 'kết thúc';
            case 7:
                return <BecomeHostStep3/>;
            case 8:
                return 'kết thúc';

            case 9:
                return 'kết thúc';
        }
    }
    console.log((100 / 3).toFixed(2));
    return (
        <div className="min-h-screen w-full">
            <div className={`pt-8 z-50  w-full px-12 `}>
                <div
                    className={`'px-10'  hidden md:grid md:grid-cols-[auto,1fr,auto] xl:grid-cols-[1.5fr,3fr,1.5fr] 2xl:grid-cols-[1fr,3fr,0.75fr] items-start`}
                >
                    {/* left side - logo */}
                    <div className="flex items-center h-12">
                        <Link href="/">
                            <Box color={logoColor}>
                                <Link href={'/'}>
                                    <FaAirbnb size={'36'} />
                                </Link>
                            </Box>
                        </Link>
                    </div>
                </div>
            </div>
            <Box w={'full'} h={'calc(100vh - 166px)'}>
                {renderSwitch(step)}
                <MultiStepBtn />
            </Box>
        </div>
    );
}
BecomeHost.Layout = 'BlankLayout';
