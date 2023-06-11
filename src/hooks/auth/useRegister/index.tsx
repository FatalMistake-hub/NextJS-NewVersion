import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import {IRegisterAccount } from 'src/types/auths.type';
import { Register } from 'src/utils/apis/auths.api';

const useRegister = () => {
    const router = useRouter();
    const client = useQueryClient();

    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: Register,
        onSuccess: (data) => {
            // Set tokens
            // const { access_token, refresh_token } = data.data;
            // localStorageClient.setValue(ACCESS_TOKEN, access_token);
            // localStorageClient.setValue(REFRESH_TOKEN, refresh_token);

            // Get user data
            // client.refetchQueries(QUERY_KEYS.GET_ME);

            // Navigate to prev page
            // if (window.history.state && window.history.state.idx > 0) {
            //     navigate(-1);
            // } else {
            //     navigate(PATHS.HOME);
            // }
        },
        onError: (error) => {},
    });

    return {
        register: async (registerData: IRegisterAccount) => {
            return mutate(registerData);
        },
        isLoading,
        isError,
        isSuccess,
    };
};

export default useRegister;
