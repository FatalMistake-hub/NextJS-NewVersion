import NextAuth, { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { httpHost } from 'src/utils/instance/http';

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            authorize: async (credentials) => {
                try {
                    // Authenticate user with credentials
                    const user = await httpHost.post(process.env.NEXT_APP_BASE_URL + '/auth/login', {
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    if (user.data && user.status === 200) {
                        return user.data;
                    }

                    return null;
                } catch (e: any) {
                    throw new Error(e);
                    // return null;
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
            console.log( session, token, user );

            return session;
        },
    },
};
export default NextAuth(authOptions);
