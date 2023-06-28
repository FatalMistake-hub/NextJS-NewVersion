import { Box, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
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
    const { step } = useAppSelector(selectBecomeHost);
    const dispatch = useAppDispatch();
    const logoColor = useColorModeValue('teal.500', 'teal.200');

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
                                    <img
                                        src="https://res.cloudinary.com/sacchidananad-utech/image/upload/v1687368934/na-letter-resolution-logo-color-on-transparent-background_uhm42s.png"
                                        alt="logo"
                                        className="h-12"
                                    />
                                </Link>
                            </Box>
                        </Link>
                    </div>
                </div>
            </div>
            <Box w={'full'} h={'calc(100vh - 166px)'}>
                <div className="pb-24">
                    {step === 1 ? (
                        <BecomeHostStep1 key="BecomeHostStep1" />
                    ) : step === 2 ? (
                        <LocationSt1 key="LocationSt1" />
                    ) : step === 3 ? (
                        <CategorySt1 dataCategory={dataCategory} key="CategorySt1" />
                    ) : step === 4 ? (
                        <BecomeHostStep2 key="BecomeHostStep2" />
                    ) : step === 5 ? (
                        <DescriptionSt2 key="DescriptionSt2" />
                    ) : step === 6 ? (
                        <TimeFrameSt2 key="TimeFrameSt2" />
                    ) : step === 7 ? (
                        <ImageListSt2 key="ImageListSt2" />
                    ) : step === 8 ? (
                        <BecomeHostStep3 key="BecomeHostStep3" />
                    ) : step === 9 ? (
                        <TittleSt3 key="TittleSt3" />
                    ) : step === 10 ? (
                        <PriceSt3 key="PriceSt3" />
                    ) : (
                        step === 11 && <FinalSt3 key="FinalSt3" />
                    )}
                </div>
                <MultiStepBtn key="MultiStepBtn" />
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
