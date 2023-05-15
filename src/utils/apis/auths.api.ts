import { IAccount, IRegisterAccount } from 'src/types/auths.type';
import { http } from '../instance/http';


export const Login = async (account: IAccount) => await http.post<any>('/auth/login', account);
export const Register = async (registerAccount: IRegisterAccount) => await http.post<any>('/user/register', registerAccount);
export const Logout = async () => await http.post<any>('/auth/logout', );
