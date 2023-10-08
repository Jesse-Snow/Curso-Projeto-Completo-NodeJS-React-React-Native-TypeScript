import { createContext,ReactNode,useState } from 'react';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
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

import { setupAPIClient } from '../services/api';
export const AuthContext = createContext({} as AuthContextData);

// Desloga o usuário
export function signOut(){
    const router = useRouter();
    try{
        // Remove os dados que foram armazenados no cookie, faznedo com que não passe dados do user na requisição
        destroyCookie(undefined,'@nextauth.token');
        // Vai para rota inicial
        router.push('/');
    }catch{
        console.log('Erro ao deslogar');
    }
}
export function AuthProvider({children}: AuthProviderProps){
    const [user,setUser] = useState<UserProps>();
    const isAuthenticated = !!user; // Caso a variável esteja vazia, será false

    async function signIn({email,password} : SignInProps){
        alert('Usuario:' + email);
        alert('Senha' + password)
    }

    return (
        <AuthContext.Provider value={{user,isAuthenticated,signIn,signOut}}>
            {children}
        </AuthContext.Provider>
    )
}