import NextAuth from 'next-auth';

declare module 'next-auth' {

    interface Session {
        user: {
            exp: number;
            iat: number;
            jti: string;
            token: string;
            type: string;
            refreshToken: string;
        };
    }
}
