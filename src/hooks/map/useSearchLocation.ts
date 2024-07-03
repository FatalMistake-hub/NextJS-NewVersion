import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { searchLocation } from 'src/utils/apis/maps.api';
import useDebounce from '../useDebounced';

const useSearchLocation = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { isLoading, error, data, isSuccess } = useQuery({
        queryKey: ['geocodes', debouncedSearchTerm],
        queryFn: async () => await searchLocation(debouncedSearchTerm),
        enabled: !!debouncedSearchTerm,
    });

    return {
        data,
        isLoading,
        error,
        isSuccess,
        setSearchTerm,
    };
};

export default useSearchLocation;
