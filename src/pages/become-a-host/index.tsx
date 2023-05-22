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
import CategorySt1 from '@components/Hosting/BecomeHost/Step1/Category';
import { GetServerSideProps } from 'next';
import { getAllCategory } from 'src/utils/apis/category.api';
import { IAllCategory } from 'src/types/category.type';
import DescriptionSt2 from '@components/Hosting/BecomeHost/Step2/Description';
import TimeFrameSt2 from '@components/Hosting/BecomeHost/Step2/TimeFrame';
interface Props {
    dataCategory: IAllCategory;
}
const BecomeHost = ({ dataCategory }: Props) => {
    const { step } = useAppSelector(selectBecomeHost);
    const dispatch = useAppDispatch();
    const logoColor = useColorModeValue('teal.500', 'teal.200');

    function renderSwitch(param: number) {
        switch (param) {
            case 1:
                return <BecomeHostStep1 />;

            case 2:
                return <LocationSt1 />;
            case 3:
                return <CategorySt1 dataCategory={dataCategory} />;
            case 4:
                return <BecomeHostStep2 />;
            case 5:
                return <DescriptionSt2 />;
            case 6:
                return <TimeFrameSt2 />;
            case 7:
                return 'kết thúc';
            case 8:
                return <BecomeHostStep3 />;
            case 9:
                return 'kết thúc';

            case 10:
                return 'kết thúc';
            default:
                return null;
        }
    }
    console.log('reRender');

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
            <Box w={'full'} h={'calc(100vh - 166px)'} mb={12}>
                {step && renderSwitch(step)}
                <MultiStepBtn />
            </Box>
        </div>
    );
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const { data } = await getAllCategory();

    return {
        props: { dataCategory: data },
    };
};
export default BecomeHost;
BecomeHost.Layout = 'BlankLayout';
