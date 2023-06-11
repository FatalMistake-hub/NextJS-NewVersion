import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    SimpleGrid,
    StackDivider,
    Text,
    VStack,
} from '@chakra-ui/react';
import TourFormWrapper from '@components/Wrapper/TourFormWrapper';
import Image from 'next/image';
import Link from 'next/link';
import { BiX } from 'react-icons/bi';
import { BsEyeFill } from 'react-icons/bs';
import useDelTour from 'src/hooks/hosting/tours/useDelTour';

import useGetDetailHostTour from 'src/hooks/hosting/tours/useGetDetailHostTour';
import BasicInfo from './BasicInfo';
import ImageList from './ImageList';
import Location from './Location';
import PriceTime from './PriceTime';

interface IDetailTourProps {
    onClose: () => void;
    tourId: number | undefined;
}
const DetailTour = ({ onClose, tourId }: IDetailTourProps) => {
    const { data, isLoading, isError, isSuccess } = useGetDetailHostTour(tourId);
    const { deleteTours } = useDelTour();
    return (
        <div className="px-8  relative">
            <Flex px={6} py={8} alignItems={'center'} justifyContent={'space-between'}>
                <Heading lineHeight={1.4} as="h2" fontSize={'26px'} fontWeight={'600'} width={'full'} noOfLines={2}>
                    {data?.title}
                </Heading>
                <Link href={`/tours/${data?.tourId}`}>
                    <a target="_blank">
                        <IconButton
                            aria-label="close"
                            icon={<BsEyeFill />}
                            size={'md'}
                            variant={'ghost'}
                            colorScheme={'blackAlpha'}
                            rounded={'full'}
                            color={'black'}
                            onClick={onClose}
                            fontSize={'18px'}
                        />
                    </a>
                </Link>
                <IconButton
                    aria-label="close"
                    icon={<BiX />}
                    size={'md'}
                    variant={'ghost'}
                    colorScheme={'blackAlpha'}
                    rounded={'full'}
                    color={'black'}
                    onClick={onClose}
                    fontSize={'26px'}
                />
            </Flex>
            <Accordion width={'full'} px={2} defaultIndex={[0]} allowMultiple>
                <AccordionItem py={4} borderTop={'none'}>
                    <AccordionButton>
                        <Heading
                            lineHeight={1.4}
                            as="h3"
                            fontSize={'20px'}
                            fontWeight={'600'}
                            width={'full'}
                            noOfLines={2}
                            textAlign="left"
                        >
                            Ảnh
                        </Heading>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <ImageList data={data?.images} imageMain={data?.imageMain} tourId={data?.tourId} />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem py={4}>
                    <AccordionButton>
                        <Heading
                            lineHeight={1.4}
                            as="h3"
                            fontSize={'20px'}
                            fontWeight={'600'}
                            width={'full'}
                            noOfLines={2}
                            textAlign="left"
                        >
                            Thông tin cơ bản về trải nghiệm
                        </Heading>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>{data && <BasicInfo value={data} tourId={`${data?.tourId}`} />}</AccordionPanel>
                </AccordionItem>
                <AccordionItem py={4}>
                    <AccordionButton>
                        <Heading
                            lineHeight={1.4}
                            as="h3"
                            fontSize={'20px'}
                            fontWeight={'600'}
                            width={'full'}
                            noOfLines={2}
                            textAlign="left"
                        >
                            Định giá và lịch trình
                        </Heading>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>{data && <PriceTime value={data} tourId={`${data?.tourId}`} />}</AccordionPanel>
                </AccordionItem>
                <AccordionItem py={4}>
                    <AccordionButton>
                        <Heading
                            lineHeight={1.4}
                            as="h3"
                            fontSize={'20px'}
                            fontWeight={'600'}
                            width={'full'}
                            noOfLines={2}
                            textAlign="left"
                        >
                            Vị trí
                        </Heading>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>{data && <Location value={data} tourId={`${data?.tourId}`} />}</AccordionPanel>
                </AccordionItem>
            </Accordion>
            <div className="absolute right-12 bottom-[-100px] pb-8">
                <Button
                    colorScheme={'red'}
                    onClick={() => {
                        if (tourId) {
                            deleteTours(tourId);
                        }
                        if (isSuccess) {
                            onClose();
                        }
                    }}
                >
                    Xoá{' '}
                </Button>
            </div>
        </div>
    );
};

export default DetailTour;
