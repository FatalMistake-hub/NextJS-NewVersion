import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
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
import FilterModal from '@components/Modal/FilterModal';
import { FC, JSXElementConstructor, ReactElement } from 'react';
import { FaChevronDown, FaSlidersH } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import LanguagePicker from '../FilterItem/LanguagePicker';
import PriceRange from '../FilterItem/PriceRange';
import TimeInDay from '../FilterItem/TimeInDay';
interface NavItem {
    type?: string;
    label?: string;
    rightIcon?: ReactElement<any, string | JSXElementConstructor<any>>;
    leftIcon?: ReactElement<any, string | JSXElementConstructor<any>>;
    subLabel?: string;
    children?: ReactElement;
    href?: string;
    minWidth?: string;
}
const NAV_ITEMS: Array<NavItem> = [
    {
        type: 'Button',
        label: 'Giá',
        rightIcon: <FaChevronDown />,
        children: <PriceRange />,
        minWidth: '400px',
    },
    {
        type: 'Button',
        label: 'Ngôn ngữ có thể sử dụng',
        rightIcon: <FaChevronDown />,
        children: <LanguagePicker />,
        minWidth: '500px',
    },
    {
        type: 'Button',
        label: 'Thời gian trong ngày',
        rightIcon: <FaChevronDown />,
        children: <TimeInDay />,
        minWidth: '320px',
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

const FilterNav: FC = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
    const { isOpen: isFilterOpen, onClose: onFilterClose, onOpen: onFilterOpen } = useDisclosure();
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
                                        colorScheme="black"
                                        variant="outline"
                                    >
                                        {navItem.label}
                                    </Button>
                                ) : (
                                    <Divider orientation="vertical" />
                                )}
                            </PopoverTrigger>
                            {navItem.children ? (
                                <PopoverContent p={2} minW={navItem.minWidth}>
                                    <PopoverArrow />

                                    <PopoverBody>{navItem.children}</PopoverBody>
                                    <PopoverFooter>
                                        <div className="flex items-center justify-between w-full pt-1">
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
                <Button borderRadius="48px" leftIcon={<FaSlidersH />} colorScheme="black" variant="outline" onClick={onFilterOpen}>
                    Bộ lọc
                </Button>
            </div>
            <FilterModal isOpen={isFilterOpen} onClose={onFilterClose} />
        </>
        // </Stack>
    );
};
export default FilterNav;
