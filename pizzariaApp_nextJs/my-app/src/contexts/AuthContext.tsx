import { createContext,ReactNode,useState } from 'react';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
}

type UserProps = {
    id: string;
    user: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}


type AuthProviderProps = {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){
    const [user,setUser] = useState<UserProps>();
    const isAuthenticated = !!user; // Caso a variável esteja vazia, será false

    async function signIn(){
        alert('Clicou no Login')
    }

    return (
        <AuthContext.Provider value={{user,isAuthenticated,signIn}}>
            {children}
        </AuthContext.Provider>
    )
}