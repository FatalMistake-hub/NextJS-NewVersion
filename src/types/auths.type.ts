export interface IAccount {
    email: string|undefined;
    password: string|undefined;
}
export interface IRegisterAccount {
    userEmail: string;
    userPassword: string;
    matchingPassword: string;
    userName: string;
}
