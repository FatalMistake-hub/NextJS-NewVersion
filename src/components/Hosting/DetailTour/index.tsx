import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Heading,
    IconButton,
    SimpleGrid,
    StackDivider,
    Text,
    VStack,
} from '@chakra-ui/react';
import TourTittleForm from '@components/Hosting/DetailTour/TourTittleForm';
import Image from 'next/image';
import Link from 'next/link';
import { BiX } from 'react-icons/bi';
import { BsEyeFill } from 'react-icons/bs';

import useGetDetailHostTour from 'src/hooks/hosting/tours/useGetDetailHostTour';
import ImageList from './ImageList';

interface IDetailTourProps {
    onClose: () => void;
    tourId: number | undefined;
}
const DetailTour = ({ onClose, tourId }: IDetailTourProps) => {
    const { data, isLoading, isError, isSuccess } = useGetDetailHostTour(tourId);
    return (
        <div className="px-2">
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
                        <ImageList data={data?.images} imageMain={data?.imageMain} />
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
                    <AccordionPanel pb={4}>
                        <TourTittleForm />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default DetailTour;
