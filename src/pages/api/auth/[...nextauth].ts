import NextAuth, { AuthOptions, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import useLogin from 'src/hooks/auth/useLogin';
import { http } from 'src/utils/instance/http';

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            authorize: async (credentials) => {
                try {
                    // Authenticate user with credentials
                    const user = await http.post(process.env.NEXT_APP_BASE_URL + '/login', {
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    if (user.data) {
                        return user.data;
                    }

                    return null;
                } catch (e: any) {
                    // throw new Error(e);
                    return null;
                }
            },
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            console.log({ account });

            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;

            return session;
        },
    },
};
export default NextAuth(authOptions);
