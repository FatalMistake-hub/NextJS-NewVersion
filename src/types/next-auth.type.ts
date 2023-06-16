import NextAuth from 'next-auth';
import { ERole } from 'src/utils/constants/Enums';

declare module 'next-auth' {
    interface Session {
        user: {
            exp: number;
            iat: number;
            jti: string;
            token: string;
            type: string;
            refreshToken: string;
            role: ERole;
            username: string;
            isWallet:boolean;
        };
    }
}
