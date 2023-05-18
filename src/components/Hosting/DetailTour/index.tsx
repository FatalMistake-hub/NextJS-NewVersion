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
import TourTittleForm from '@components/Form/TourForm/TourTittleForm';
import Image from 'next/image';
import { BiX } from 'react-icons/bi';
import ImageList from './ImageList';

interface IDetailTourProps {
    onClose: () => void;
}
const DetailTour = ({ onClose }: IDetailTourProps) => {
    return (
        <div className="px-2">
            <Flex px={6} py={8} alignItems={'center'} justifyContent={'space-between'}>
                <Heading lineHeight={1.4} as="h2" fontSize={'26px'} fontWeight={'600'} width={'full'} noOfLines={2}>
                    Khám phá Địa đạo Củ Chi Chuyến đi nửa ngày
                </Heading>
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
                        <ImageList />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem py={4} >
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
