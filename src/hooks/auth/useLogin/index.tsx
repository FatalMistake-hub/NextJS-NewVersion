import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { IAccount } from 'src/types/auths.type';
import { Login } from 'src/utils/apis/auths.api';

const useLogin = () => {
    const router = useRouter();
    const client = useQueryClient();

    const {data, mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: Login,
        onSuccess: (data) => {
            // Set tokens
            // const { access_token, refresh_token } = data.data;
            // localStorageClient.setValue(ACCESS_TOKEN, access_token);
            // localStorageClient.setValue(REFRESH_TOKEN, refresh_token);
            console.log('data', data.data);

            // Get user data
            // client.refetchQueries(QUERY_KEYS.GET_ME);

            // Navigate to prev page
            // if (window.history.state && window.history.state.idx > 0) {
            //     navigate(-1);
            // } else {
            //     navigate(PATHS.HOME);
            // }
            // return data.data;
        },
        onError: (error) => {},
    });

    return {
        login: async (loginData: IAccount) => {
            return mutate(loginData);
        },
        data,
        isLoading,
        isError,
        isSuccess,
    };
};

export default useLogin;
