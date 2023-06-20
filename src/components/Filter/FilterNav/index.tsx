import {
    Box,
    Text,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    useDisclosure,
    Divider,
    PopoverFooter,
    Center,
    HStack,
} from '@chakra-ui/react';
import FilterModal from '@components/Modal/FilterModal';

import { FC, JSXElementConstructor, ReactElement } from 'react';
import { FaChevronDown, FaSlidersH } from 'react-icons/fa';

import LanguagePicker from '../FilterItem/LanguagePicker';
import PriceRange from '../FilterItem/PriceRange';
import TimeInDay from '../FilterItem/TimeInDay';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { selectSearch, SET_CATEGORY } from 'src/redux/slice/searchSlice';
import { useRouter } from 'next/router';
interface NavItem {
    id?: number;
    type?: string;
    label: string;
    rightIcon?: ReactElement<any, string | JSXElementConstructor<any>>;
    leftIcon?: ReactElement<any, string | JSXElementConstructor<any>>;
    subLabel?: string;
    children?: ReactElement;
    href?: string;
    minWidth?: string;
}
interface Props {
    dataCategory: any;
}
const FilterNav = ({ dataCategory }: Props) => {
    const NAV_ITEMS: Array<NavItem> = [
        {
            id: 87,
            type: 'Button',
            label: 'Giá',
            rightIcon: <FaChevronDown />,
            children: <PriceRange />,
            minWidth: '400px',
        },
        {
            id: 88,
            type: 'Button',
            label: 'Ngôn ngữ có thể sử dụng',
            rightIcon: <FaChevronDown />,
            children: <LanguagePicker />,
            minWidth: '500px',
        },
        {
            id: 89,
            type: 'Button',
            label: 'Thời gian trong ngày',
            rightIcon: <FaChevronDown />,
            children: <TimeInDay />,
            minWidth: '320px',
        },
        {
            type: 'Divider',
        },
        ...dataCategory,
    ];

    const { isOpen: isFilterOpen, onClose: onFilterClose, onOpen: onFilterOpen } = useDisclosure();
    const dispatch = useAppDispatch();
    const { categoryList } = useAppSelector(selectSearch);
    const router = useRouter();
    return (
        // <Stack direction={'row'} spacing={2} justifyContent="space-between" width="full" >
        // <div className="flex flex-wrap items-center justify-between w-full pl-1 overflow-y-hidden h-14 ">
        <>
            <HStack
                spacing="8px"
                // w={'full'}
                overflowY={'hidden'}
                flexWrap={'wrap'}
                h={14}
                alignItems={'center'}
                justifyContent={'end'}
                pl={1}
                pr={1}
            >
                {NAV_ITEMS.map((navItem, i) => (
                    <Box key={i} className="py-2">
                        <Popover placement={'bottom-start'}>
                            <PopoverTrigger>
                                {navItem.type === 'Button' ? (
                                    <Button
                                        borderRadius="48px"
                                        rightIcon={navItem.rightIcon}
                                        leftIcon={navItem.leftIcon}
                                        colorScheme="blackAlpha"
                                        variant="outline"
                                        isActive={
                                            // i < 3 ? false : categoryList.find((item: any) => item.categoryId === navItem.id) ? true : false
                                            navItem.id === categoryList?.categoryId ? true : false
                                        }
                                        // color={'black.100'}
                                        borderWidth={
                                            // i >= 3 && categoryList.find((item: any) => item.categoryId === navItem.id) ? 2 : 1
                                            navItem.id === categoryList?.categoryId ? 2 : 1
                                        }
                                        onClick={() => {
                                            if (navItem.id === categoryList?.categoryId) {
                                                dispatch(SET_CATEGORY({}));
                                                router.push('/');
                                            } else {
                                                navItem.id === 87 || navItem.id === 88 || navItem.id === 89
                                                    ? null
                                                    : dispatch(
                                                          SET_CATEGORY({
                                                              categoryId: navItem.id,
                                                              label: navItem.label,
                                                              // type: navItem.type,
                                                          }),
                                                      );
                                            }
                                        }}
                                    >
                                        <Text color={'black'}>{navItem.label}</Text>
                                    </Button>
                                ) : (
                                    <Center height="25px" px={2}>
                                        <Divider orientation="vertical" borderColor="black.50" />
                                    </Center>
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
            </HStack>
            <div className="flex items-center pr-1 ml-2">
                <Button borderRadius="48px" leftIcon={<FaSlidersH />} colorScheme="blackAlpha" variant="outline" onClick={onFilterOpen}>
                    <Text color={'black'}> Bộ lọc</Text>
                </Button>
            </div>
            <FilterModal isOpen={isFilterOpen} onClose={onFilterClose} />
        </>
        // </Stack>
    );
};

export default FilterNav;
