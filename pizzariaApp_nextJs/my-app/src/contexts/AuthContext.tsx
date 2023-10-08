import { createContext,ReactNode,useState } from 'react';
import { destroyCookie,setCookie } from 'nookies';
import { useRouter } from 'next/router';
import { api } from '../services/apiClient';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>; 
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

type SignUpProps = {
    name: string,
    email: string,
    password:string
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
    const router = useRouter();

    async function signIn({email,password} : SignInProps){
        try {
            const response = await api.post('/session', { email: email, password: password});
    
            const { id, user, token } = response.data;
    
            setCookie(undefined,'@nextauth.token',token,{
                maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mês 
                path:"/" // Quais rotas terão acesso ao cookie ( / são todos)
            });

            /* Pegar os dados do user através da resposta e passar esses dados para o hook(state) user, 
               para que o Provider passe os dados do user para os outros componentes
            */
            setUser({
                id:id,
                user:user,
                email: email
            });

            // Axios defaults, irá passar no cabeçalho das próximas requisições o token
            api.defaults.headers['Authorizaion'] = `Bearer ${token}`;

            // Redirecionar para o Dashboard
            router.push('/dashboard');
        }catch(err){
            alert('Erro ao Acessar... ' + err.response.data.error)
        }
    }

    async function signUp({name,email,password} : SignUpProps){
        try { 
            const response = await api.post('/users',{ 
                name:name,
                email:email,
                password:password
            })

            alert('Usuario criado com Sucesso! Bem vindo(a) ' + response.data.name);
        }catch(err){
            console.log('Erro no cadastrado',err);
        }


        router.push('/');
    }

    return (
        <AuthContext.Provider value={{user,isAuthenticated,signIn,signOut,signUp}}>
            {children}
        </AuthContext.Provider>
    )
}