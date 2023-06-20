import { Box, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { FaAirbnb } from 'react-icons/fa';
import BecomeHostStep1 from '@components/Hosting/BecomeHost/Step1';
import BecomeHostStep2 from '@components/Hosting/BecomeHost/Step2';
import BecomeHostStep3 from '@components/Hosting/BecomeHost/Step3';
import { useAppSelector, useAppDispatch } from 'src/redux/hook';
import { selectBecomeHost } from 'src/redux/slice/becomeHostSlice';

import LocationSt1 from '@components/Hosting/BecomeHost/Step1/Location';
import CategorySt1 from '@components/Hosting/BecomeHost/Step1/Category';
import { GetServerSideProps } from 'next';
import { getAllCategory } from 'src/utils/apis/category.api';
import { IAllCategory } from 'src/types/category.type';
import DescriptionSt2 from '@components/Hosting/BecomeHost/Step2/Description';
import TimeFrameSt2 from '@components/Hosting/BecomeHost/Step2/TimeFrame';
import ImageListSt2 from '@components/Hosting/BecomeHost/Step2/ImageList';
import TittleSt3 from '@components/Hosting/BecomeHost/Step3/Tittle';
import PriceSt3 from '@components/Hosting/BecomeHost/Step3/Price';
import FinalSt3 from '@components/Hosting/BecomeHost/Step3/Final';
import MultiStepBtn from '@components/GroupButton/MultiStepBtn';

interface Props {
    dataCategory: IAllCategory;
}
const BecomeHost = ({ dataCategory }: Props) => {
    const { step, tour } = useAppSelector(selectBecomeHost);
    const dispatch = useAppDispatch();
    const logoColor = useColorModeValue('teal.500', 'teal.200');

    console.log('reRender');
    const componentRender = [
        <BecomeHostStep1 />,
        <LocationSt1 />,
        <CategorySt1 dataCategory={dataCategory} />,
        <BecomeHostStep2 />,
        <DescriptionSt2 />,
        <TimeFrameSt2 />,
        <ImageListSt2 />,
        <BecomeHostStep3 />,
        <TittleSt3 />,
        <PriceSt3 />,
        <FinalSt3 />,
    ];
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
                <div className="pb-24">
                    {step === 1 ? (
                        <BecomeHostStep1 />
                    ) : step === 2 ? (
                        <LocationSt1 />
                    ) : step === 3 ? (
                        <CategorySt1 dataCategory={dataCategory} />
                    ) : step === 4 ? (
                        <BecomeHostStep2 />
                    ) : step === 5 ? (
                        <DescriptionSt2 />
                    ) : step === 6 ? (
                        <TimeFrameSt2 />
                    ) : step === 7 ? (
                        <ImageListSt2 />
                    ) : step === 8 ? (
                        <BecomeHostStep3 />
                    ) : step === 9 ? (
                        <TittleSt3 />
                    ) : step === 10 ? (
                        <PriceSt3 />
                    ) : step === 11 && (
                        <FinalSt3 />
                    ) }
                    {/* {componentRender.map((item, index) => (
                        <div key={index} className={`${index + 1 === step ? '' : 'hidden'} ${index + 1}`}>
                            {item}
                        </div>
                    )) */}
                    {/* } */}
                </div>
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
BecomeHost.requireAuth = true;
export default BecomeHost;
BecomeHost.Layout = 'BlankLayout';
