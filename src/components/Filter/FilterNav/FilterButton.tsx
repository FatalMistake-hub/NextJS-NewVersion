import {
  Button,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import FilterModal from '@components/Modal/FilterModal';

import { FaSlidersH } from 'react-icons/fa';

export default function FilterButton() {
    const { isOpen: isFilterOpen, onClose: onFilterClose, onOpen: onFilterOpen } = useDisclosure();
    return (
        <>
            <div className="flex items-center pr-1 ml-2">
                <Button borderRadius="48px" leftIcon={<FaSlidersH />} colorScheme="blackAlpha" variant="outline" onClick={onFilterOpen}>
                    <Text color={'black'}> Bộ lọc</Text>
                </Button>
            </div>
            <FilterModal isOpen={isFilterOpen} onClose={onFilterClose} />
        </>
        // </Stack>
    );
}
