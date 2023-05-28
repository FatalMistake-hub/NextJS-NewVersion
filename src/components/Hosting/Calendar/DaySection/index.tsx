import {
    VStack,
    StackDivider,
    Box,
    Heading,
    Flex,
    Stack,
    IconButton,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    SimpleGrid,
    Checkbox,
    Button,
    Text,
} from '@chakra-ui/react';
import { BiX, BiCheck, BiMinus, BiPlus } from 'react-icons/bi';
import { useState } from 'react';
import { DateTimeToString } from 'src/utils/dateUntils';

const DaySection = () => {
    const DateBookView = {
        content: [
            {
                dayBookId: 'd4e2b70b-bddf-4108-833f-6774cbe43802',
                date_name: '2023-05-25T17:00:00.000+00:00',
                tourId: 187676437,
                status: 'AVAILABLE',
                is_deleted: true,
                timeBookViewDtoList: [
                    {
                        timeId: '451f66f7-6dea-4055-a6ba-481d34e88e18',
                        start_time: '02:30:00',
                        end_time: '04:30:00',
                        is_deleted: false,
                    },
                    {
                        timeId: 'f2cf0d91-52b5-4128-85e0-5e3c75587939',
                        start_time: '04:30:00',
                        end_time: '06:30:00',
                        is_deleted: true,
                    },
                    {
                        timeId: 'ec655326-3030-4233-9eb6-18a28d518792',
                        start_time: '06:30:00',
                        end_time: '08:30:00',
                        is_deleted: false,
                    },
                    {
                        timeId: '0e76b51e-ef62-45c3-903d-45a79872ea4b',
                        start_time: '08:30:00',
                        end_time: '10:30:00',
                        is_deleted: false,
                    },
                    {
                        timeId: '0cf001c1-812e-41b1-92f8-d1de80451241',
                        start_time: '10:30:00',
                        end_time: '12:30:00',
                        is_deleted: true,
                    },
                    {
                        timeId: '27eded44-da3c-4e38-9cde-13ae52df6880',
                        start_time: '12:30:00',
                        end_time: '14:30:00',
                        is_deleted: false,
                    },
                    {
                        timeId: '72b6d498-9a02-4137-86bf-729fa2260c1b',
                        start_time: '14:30:00',
                        end_time: '16:30:00',
                        is_deleted: true,
                    },
                    {
                        timeId: '7a55b563-0b8c-4afa-93ca-47b715ed1c51',
                        start_time: '16:30:00',
                        end_time: '18:30:00',
                        is_deleted: false,
                    },
                    {
                        timeId: '61e982f4-686b-4e5e-890a-300c297d53d0',
                        start_time: '18:30:00',
                        end_time: '20:30:00',
                        is_deleted: false,
                    },
                    {
                        timeId: '1911863d-c4b2-450a-8b71-a7b33ead4bb3',
                        start_time: '20:30:00',
                        end_time: '22:30:00',
                        is_deleted: false,
                    },
                ],
            },
            {
                dayBookId: '2a4e9182-3ec2-4cd8-9773-cf79f38b3299',
                date_name: '2023-05-26T17:00:00.000+00:00',
                tourId: 187676437,
                status: 'AVAILABLE',
                is_deleted: false,
                timeBookViewDtoList: [
                    {
                        timeId: 'd2b187e4-8358-4059-b9fa-cc5a4c46fedc',
                        start_time: '02:30:00',
                        end_time: '04:30:00',
                        is_deleted: false,
                    },
                    {
                        timeId: '77f6a425-fed0-448f-906c-b1415ca66ac0',
                        start_time: '04:30:00',
                        end_time: '06:30:00',
                        is_deleted: false,
                    },
                    {
                        timeId: '115e6104-14a8-46ca-bf52-1230c38d0c75',
                        start_time: '06:30:00',
                        end_time: '08:30:00',
                        is_deleted: false,
                    },
                    {
                        timeId: '8dcadb51-6c96-4352-94ba-3d78928a6cea',
                        start_time: '08:30:00',
                        end_time: '10:30:00',
                        is_deleted: true,
                    },
                    {
                        timeId: '2659ea6c-791d-4e19-8d62-e2916f3e85d9',
                        start_time: '10:30:00',
                        end_time: '12:30:00',
                        is_deleted: false,
                    },
                    {
                        timeId: '9e0e1086-9597-49a2-b56c-f6b78bd745d1',
                        start_time: '12:30:00',
                        end_time: '14:30:00',
                        is_deleted: false,
                    },
                    {
                        timeId: '51d609f2-29a5-4739-8c02-20bda594f722',
                        start_time: '14:30:00',
                        end_time: '16:30:00',
                        is_deleted: true,
                    },
                    {
                        timeId: 'eb5b6f28-7f9a-428d-98b4-ba95a4ab4314',
                        start_time: '16:30:00',
                        end_time: '18:30:00',
                        is_deleted: false,
                    },
                    {
                        timeId: '481d4446-0acd-475e-80c1-457799a067d8',
                        start_time: '18:30:00',
                        end_time: '20:30:00',
                        is_deleted: false,
                    },
                    {
                        timeId: '28b057d7-4648-466d-9f6f-d633a441b386',
                        start_time: '20:30:00',
                        end_time: '22:30:00',
                        is_deleted: true,
                    },
                ],
            },
        ],
    };

    const [response, setResponse] = useState<any>(DateBookView);
    const handleStatusDay = (status: boolean, id: string) => {
        const newTime = response.content.map((date: any) => {
            if (date.dayBookId === id) {
                return {
                    ...date,
                    is_deleted: status,
                };
            }
            return date;
        });
      setResponse({ content: newTime });
        console.log({ content: newTime });
      
    };
    const handleChecked = (isActive: boolean, id: string, dayBookId: string) => {
        console.log(isActive, !isActive);
        const newTime = response.content.map((date: any) => {
            if (date.dayBookId === dayBookId) {
                const updatedTimeBookViewDtoList = date.timeBookViewDtoList.map((time: any) => {
                    if (time.timeId === id) {
                        return {
                            ...time,
                            is_deleted: !isActive,
                        };
                    }
                    return time;
                });
                return {
                    ...date,
                    timeBookViewDtoList: updatedTimeBookViewDtoList,
                };
            }
            return date;
        });
        setResponse({ content: newTime });

        console.log({ content: newTime });
    };
    return (
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
                        {response.content?.map((date: any) => (
                            <AccordionItem px={2} border={'0px'}>
                                {({ isExpanded }: any) => (
                                    <>
                                        <AccordionButton>
                                            {/* <AccordionIcon /> */}
                                            {isExpanded ? <BiMinus fontSize="12px" /> : <BiPlus fontSize="12px" />}

                                            <Text fontSize={'18px'} fontWeight={600} as="span" flex="1" textAlign="left" pl={4}>
                                                {DateTimeToString(date.date_name)}
                                            </Text>
                                            <Stack spacing={4} direction="row" align="center">
                                                <IconButton
                                                    rounded={'full'}
                                                    fontSize="20px"
                                                    aria-label="x"
                                                    variant={!date.is_deleted ? 'outline' : ''}
                                                    colorScheme={!date.is_deleted ? 'blackAlpha' : ''}
                                                    textColor={!date.is_deleted ? 'black' : 'white'}
                                                    backgroundColor={!date.is_deleted ? 'white' : 'black'}
                                                    size="sm"
                                                    icon={<BiX />}
                                                    // isDisabled={!date.is_deleted}
                                                    onClick={() => {
                                                        if (date.is_deleted === false) {
                                                            handleStatusDay(true, date.dayBookId);
                                                        }
                                                    }}
                                                />

                                                <IconButton
                                                    rounded={'full'}
                                                    fontSize="20px"
                                                    aria-label="v"
                                                    variant={date.is_deleted ? 'outline' : ''}
                                                    colorScheme={date.is_deleted ? 'blackAlpha' : ''}
                                                    textColor={date.is_deleted ? 'black' : 'white'}
                                                    backgroundColor={date.is_deleted ? 'white' : 'black'}
                                                    size="sm"
                                                    icon={<BiCheck />}
                                                    // isDisabled={date.is_deleted}
                                                    onClick={() => {
                                                        if (date.is_deleted === true) {
                                                            handleStatusDay(false, date.dayBookId);
                                                        }
                                                    }}
                                                />
                                            </Stack>
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            <SimpleGrid columns={2} spacing={4} p={2}>
                                                {date.timeBookViewDtoList.map((time: any) => (
                                                    <Checkbox
                                                        fontSize={'14px'}
                                                        fontWeight={600}
                                                        colorScheme="teal"
                                                        size={'md'}
                                                        key={time.timeId}
                                                        isChecked={!time.is_deleted}
                                                        value={time.is_deleted}
                                                        onChange={(e) => handleChecked(time.is_deleted, time.timeId, date.dayBookId)}
                                                    >
                                                        {time.start_time.substring(0, 5)} - {time.end_time.substring(0, 5)}
                                                    </Checkbox>
                                                ))}
                                            </SimpleGrid>
                                            <Flex justifyContent={'flex-end'} p={'2'}>
                                                <Button
                                                    colorScheme={'teal'}
                                                    onClick={() =>
                                                        console.log(response.content.find((res: any) => res.dayBookId === date.dayBookId))
                                                    }
                                                >
                                                    Lưu
                                                </Button>
                                            </Flex>
                                        </AccordionPanel>
                                    </>
                                )}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Flex>
            </Box>
        </VStack>
    );
};

export default DaySection;
