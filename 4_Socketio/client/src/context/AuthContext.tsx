import * as React from 'react';
import { PropsWithChildren } from 'react';

interface IUser {
    id: string;
    username: string;
    avatar: string;
}

interface IContext {
    user: IUser | null;
    isAuthenticated: boolean;
    login: Function;
    logout: Function;
}

export const AuthContext = React.createContext({} as IContext);

export function AuthProvider({ children }: PropsWithChildren) {

    const [user, setUser] = React.useState<null | IUser>(null);

    const isAuthenticated: boolean = !!user;

    React.useEffect(() => {
        verifySession();
    }, []);

    async function verifySession() {
        const user = localStorage.getItem('auth-data');
        if (user) {
            setUser(JSON.parse(user));
        }
    }

    async function login({ username, password }: { username: string, password: string }): Promise<void> {

        if (!(username === "user1" && password === "12345" || username === "user2" && password === "12345")) {
            throw new Error('Invalid credentials');
        }

        const user = { id: '1', username, avatar: "images/" + username + '.png' };
        localStorage.setItem('auth-data', JSON.stringify(user));
        setUser(user);

    }

    async function logout(): Promise<void> {
        localStorage.removeItem('auth-data');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    return React.useContext(AuthContext);
}
