import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { searchAddress } from 'src/utils/apis/maps.api';
import useDebounce from '../useDebounced';

const useAddressLocation = () => {
    const [searchTerm, setAddressTerm] = useState<string>('');

    const debouncedAddressTerm = useDebounce(searchTerm, 500);
    const { isLoading, error, data, isSuccess } = useQuery(
        ['address', debouncedAddressTerm],
        async () => await searchAddress(debouncedAddressTerm),
        {
            enabled: !!debouncedAddressTerm,
        },
    );

    return {
        data,
        isLoading,
        error,
        isSuccess,
        setAddressTerm,
    };
};

export default useAddressLocation;
