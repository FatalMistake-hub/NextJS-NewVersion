import { NextAuthOptions, getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { userService } from './services/userService';

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account, profile, user }) {
            //(2)
            console.log('------------ JWT ------------');
            console.log({ token }, { account }, { profile }, {user});
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            //(3)
            console.log('------------ SESSION ------------');
            console.log({ session }, { token }, { user });
            session.user = token as any;
            return session;
        },
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const user = await userService.authenticate(email, password);
                console.log( user );
                return user;
            },
        }),
    ],
};
export const getServerAuthSession = () => getServerSession(authOptions);
//     secret: process.env.NEXTAUTH_SECRET,
//     providers: [
//         CredentialsProvider({
//             name: 'Credentials',
//             authorize: async (credentials) => {
//                 try {
//                     // Authenticate user with credentials
//                     const user = await httpHost.post(process.env.NEXT_APP_BASE_URL + '/auth/login', {
//                         email: credentials?.email,
//                         password: credentials?.password,
//                     });

//                     if (user.data && user.status === 200) {
//                         return user.data;
//                     }

//                     return null;
//                 } catch (e: any) {
//                     throw new Error(e);
//                     // return null;
//                 }
//             },
//             credentials: {
//                 email: { label: 'Email', type: 'text' },
//                 password: { label: 'Password', type: 'password' },
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user, account }) {
//             console.log({ account });

//             return { ...token, ...user };
//         },
//         async session({ session, token, user }) {
//             session.user = token as any;
//             console.log( session, token, user );

//             return session;
//         },
//     },
// };
// export default NextAuth(authOptions);
