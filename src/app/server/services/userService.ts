import { User } from "next-auth";
import { httpSever } from "src/utils/instance/http";

export const userService = {
    authenticate,
};

async function authenticate(email: string, password: string) {
    try {
        // Authenticate user with credentials
        const user = await httpSever.post<User>('/auth/login', {
            email: email,
            password: password,
        });
        
        if (user.payload && user.status === 200) {
            return user.payload;
        }

        return null;
    } catch (e: any) {
        throw new Error(e);
    }
}
