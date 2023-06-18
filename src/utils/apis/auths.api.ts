import { IAccount, IRegisterAccount } from 'src/types/auths.type';
import { http } from '../instance/http';

export const Login = async (account: IAccount) => {
    try {
        const response = await http.post<any>('/auth/login', account);
        return response;
    } catch (error) {
        return error;
    }
    // await http.post<any>('/auth/login', account);
};
export const Register = async (registerAccount: IRegisterAccount) => await http.post<any>('/user/register', registerAccount);
export const Logout = async () => await http.post<any>('/auth/logout');
