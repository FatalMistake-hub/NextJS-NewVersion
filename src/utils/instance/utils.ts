
import axios, { AxiosError } from 'axios';

// export const useQueryString = () => {
//     const [searchParams] = useRouter();
//     const searchParamsObject = Object.fromEntries([...searchParams]);
//     return searchParamsObject;
// };

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error);
}
