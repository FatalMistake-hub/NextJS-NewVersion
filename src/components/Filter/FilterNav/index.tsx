import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    PopoverArrow,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    useDisclosure,
    Divider,
    PopoverFooter,
    ButtonGroup,
} from '@chakra-ui/react';
import { FC, JSXElementConstructor, ReactElement } from 'react';
import { FaChevronDown, FaSlidersH } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

const NAV_ITEMS: Array<NavItem> = [
    {
        type: 'Button',
        label: 'Giá',
        rightIcon: <FaChevronDown />,
        children: [
            {
                label: 'Explore Design Work',
                subLabel: 'Trending Design to inspire you',
            },
        ],
    },
    {
        type: 'Button',
        label: 'Ngôn ngữ có thể sử dụng',
        rightIcon: <FaChevronDown />,

        children: [
            {
                label: 'Job Board',
                subLabel: 'Find your dream design job',
            },
        ],
    },
    {
        type: 'Button',
        label: 'Thời gian trong ngày',
        rightIcon: <FaChevronDown />,

        children: [
            {
                label: 'Job Board',
                subLabel: 'Find your dream design job',
            },
        ],
    },
    {
        type: 'Divider',
    },
    {
        type: 'Button',
        label: 'Nghệ thuật và văn hoá',
    },
    {
        type: 'Button',
        label: 'Giải trí',
    },
    {
        type: 'Button',
        label: 'Thể thao',
    },
    {
        type: 'Button',
        label: 'Tour',
    },
    {
        type: 'Button',
        label: 'Tham quan',
    },
    {
        type: 'Button',
        label: 'Chăm sóc sức khỏe',
    },
    {
        type: 'Button',
        label: 'Thiên nhiên và hoạt động ngoài trời',
    },
    // {
    //     type: 'Button',
    //     label: 'Bộ lọc',
    //     leftIcon: <FaSlidersH />,
    // },
];
interface NavItem {
    type?: string;
    label?: string;
    rightIcon?: ReactElement<any, string | JSXElementConstructor<any>>;
    leftIcon?: ReactElement<any, string | JSXElementConstructor<any>>;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const FilterNav: FC = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        // <Stack direction={'row'} spacing={2} justifyContent="space-between" width="full" >
        <>
            <div className="flex flex-wrap items-center justify-between w-full pl-1 overflow-y-hidden h-14 ">
                {NAV_ITEMS.map((navItem) => (
                    <Box key={navItem.label} className="py-2">
                        <Popover placement={'bottom-start'}>
                            <PopoverTrigger>
                                {navItem.type === 'Button' ? (
                                    <Button
                                        borderRadius="48px"
                                        rightIcon={navItem.rightIcon}
                                        leftIcon={navItem.leftIcon}
                                        colorScheme="teal"
                                        variant="outline"
                                    >
                                        {navItem.label}
                                    </Button>
                                ) : (
                                    <Divider orientation="vertical" />
                                )}
                            </PopoverTrigger>
                            {navItem.children ? (
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />

                                    <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
                                    <PopoverFooter>
                                        <div className='flex items-center justify-between w-full p-1'>
                                            <Button size="sm" variant="link">
                                                Cancel
                                            </Button>
                                            <Button size="sm" colorScheme="teal" variant="solid">
                                                Apply
                                            </Button>
                                        </div>
                                    </PopoverFooter>
                                </PopoverContent>
                            ) : null}
                        </Popover>
                    </Box>
                ))}
            </div>
            <div className="flex items-center pr-1 ml-2">
                <Button borderRadius="48px" leftIcon={<FaSlidersH />} colorScheme="teal" variant="outline">
                    Bộ lọc
                </Button>
            </div>
        </>
        // </Stack>
    );
};
export default FilterNav;
