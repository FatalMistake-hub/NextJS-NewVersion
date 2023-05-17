import { ReactElement } from 'react';
import { HeaderHosting } from '@components/layouts/common/HeaderHosting';
import {
    Box,
    Flex,
    Heading,
    Stack,
    StackDivider,
    VStack,
    Text,
    IconButton,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    SimpleGrid,
    Checkbox,
    Button,
} from '@chakra-ui/react';
import CalendarBase from '@components/Calendar';
import { BiCheck, BiMinus, BiPlus, BiX } from 'react-icons/bi';
const CalendarHosting = () => {
    return (
        <div className="pt-[86px] flex relative   ">
            <Stack w={'full'}>
                <CalendarBase />
            </Stack>
            <Stack w={'430px'} float={'right'} className="border-l border-l-gray-700  ">
                <VStack divider={<StackDivider borderColor="black.200" />} py={6} align="stretch" width={'full'}>
                    <Box p={6}>
                        <Heading lineHeight={1.4} as="h2" fontSize={'26px'} fontWeight={'600'} width={'full'} noOfLines={2} pb={12}>
                            Ngày 22 - Ngày 30 tháng 6
                        </Heading>
                        <Flex justifyContent={'space-between'}>
                            <Text fontSize={'18px'} fontWeight={600}>
                                Còn trống
                            </Text>
                            <Stack spacing={4} direction="row" align="center">
                                <IconButton
                                    rounded={'full'}
                                    fontSize="20px"
                                    aria-label="x"
                                    textColor={'white'}
                                    colorScheme={'blackAlpha'}
                                    backgroundColor={'black'}
                                    size="sm"
                                    icon={<BiX />}
                                />

                                <IconButton
                                    rounded={'full'}
                                    fontSize="20px"
                                    aria-label="v"
                                    variant={'outline'}
                                    color={'black'}
                                    size="sm"
                                    icon={<BiCheck />}
                                />
                            </Stack>
                        </Flex>
                    </Box>
                    <Box py={6}>
                        <Heading lineHeight={1.4} as="h3" fontSize={'18px'} fontWeight={'600'} width={'full'} noOfLines={2} px={6} pb={4}>
                            Ngày và các khung thời gian
                        </Heading>
                        <Flex justifyContent={'space-between'}>
                            <Accordion allowToggle w={'full'}>
                                <AccordionItem px={2} border={'0px'}>
                                    {({ isExpanded }: any) => (
                                        <>
                                            <AccordionButton>
                                                {/* <AccordionIcon /> */}
                                                {isExpanded ? <BiMinus fontSize="12px" /> : <BiPlus fontSize="12px" />}

                                                <Text fontSize={'18px'} fontWeight={600} as="span" flex="1" textAlign="left" pl={4}>
                                                    30 tháng 6
                                                </Text>
                                                <Stack spacing={4} direction="row" align="center">
                                                    <IconButton
                                                        rounded={'full'}
                                                        fontSize="20px"
                                                        aria-label="x"
                                                        textColor={'white'}
                                                        colorScheme={'blackAlpha'}
                                                        backgroundColor={'black'}
                                                        size="sm"
                                                        icon={<BiX />}
                                                    />

                                                    <IconButton
                                                        rounded={'full'}
                                                        fontSize="20px"
                                                        aria-label="v"
                                                        variant={'outline'}
                                                        color={'black'}
                                                        size="sm"
                                                        icon={<BiCheck />}
                                                    />
                                                </Stack>
                                            </AccordionButton>
                                            <AccordionPanel pb={4}>
                                                <SimpleGrid columns={2} spacing={4} p={2}>
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        checked={true}
                                                        size={'md'}
                                                    >
                                                        12:30 - 16:30
                                                    </Checkbox>
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        checked={true}
                                                        size={'md'}
                                                    >
                                                        12:30 - 16:30
                                                    </Checkbox>
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        checked={true}
                                                        size={'md'}
                                                    >
                                                        12:30 - 16:30
                                                    </Checkbox>
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        checked={true}
                                                        size={'md'}
                                                    >
                                                        12:30 - 16:30
                                                    </Checkbox>
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        checked={true}
                                                        size={'md'}
                                                    >
                                                        12:30 - 16:30
                                                    </Checkbox>
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        checked={true}
                                                        size={'md'}
                                                    >
                                                        12:30 - 16:30
                                                    </Checkbox>
                                                </SimpleGrid>
                                                <Flex justifyContent={'flex-end'} p={'2'}>
                                                    <Button colorScheme={'teal'}>Lưu</Button>
                                                </Flex>
                                            </AccordionPanel>
                                        </>
                                    )}
                                </AccordionItem>
                                <AccordionItem px={2} border={'0px'}>
                                    {({ isExpanded }: any) => (
                                        <>
                                            <AccordionButton>
                                                {/* <AccordionIcon /> */}
                                                {isExpanded ? <BiMinus fontSize="12px" /> : <BiPlus fontSize="12px" />}

                                                <Text fontSize={'18px'} fontWeight={600} as="span" flex="1" textAlign="left" pl={4}>
                                                    30 tháng 6
                                                </Text>
                                                <Stack spacing={4} direction="row" align="center">
                                                    <IconButton
                                                        rounded={'full'}
                                                        fontSize="20px"
                                                        aria-label="x"
                                                        textColor={'white'}
                                                        colorScheme={'blackAlpha'}
                                                        backgroundColor={'black'}
                                                        size="sm"
                                                        icon={<BiX />}
                                                    />

                                                    <IconButton
                                                        rounded={'full'}
                                                        fontSize="20px"
                                                        aria-label="v"
                                                        variant={'outline'}
                                                        color={'black'}
                                                        size="sm"
                                                        icon={<BiCheck />}
                                                    />
                                                </Stack>
                                            </AccordionButton>
                                            <AccordionPanel pb={4}>
                                                <SimpleGrid columns={2} spacing={4} p={2}>
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        checked={true}
                                                        size={'md'}
                                                    >
                                                        12:30 - 16:30
                                                    </Checkbox>
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        checked={true}
                                                        size={'md'}
                                                    >
                                                        12:30 - 16:30
                                                    </Checkbox>
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        checked={true}
                                                        size={'md'}
                                                    >
                                                        12:30 - 16:30
                                                    </Checkbox>
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        checked={true}
                                                        size={'md'}
                                                    >
                                                        12:30 - 16:30
                                                    </Checkbox>
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        checked={true}
                                                        size={'md'}
                                                    >
                                                        12:30 - 16:30
                                                    </Checkbox>
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        checked={true}
                                                        size={'md'}
                                                    >
                                                        12:30 - 16:30
                                                    </Checkbox>
                                                </SimpleGrid>
                                                <Flex justifyContent={'flex-end'} p={'2'}>
                                                    <Button colorScheme={'teal'}>Lưu</Button>
                                                </Flex>
                                            </AccordionPanel>
                                        </>
                                    )}
                                </AccordionItem>

                                
                            </Accordion>
                        </Flex>
                    </Box>
                </VStack>
            </Stack>
        </div>
    );
};

CalendarHosting.requireAuth = true;
export default CalendarHosting;

CalendarHosting.getLayout = function (page: ReactElement) {
    return (
        <>
            <HeaderHosting />
            {page}
        </>
    );
};
