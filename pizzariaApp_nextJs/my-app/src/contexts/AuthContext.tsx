import { createContext,ReactNode,useState,useEffect } from 'react';
import { destroyCookie,setCookie,parseCookies } from 'nookies';
import { useRouter,NextRouter } from 'next/router';
import { api } from '../services/apiClient';
import { toast } from 'react-toastify';

import { AuthTokenError } from '../services/errors/AuthTokenError'

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


export const AuthContext = createContext({} as AuthContextData);

// Desloga o usuário
export function signOut( Router : NextRouter = null){
    
    /* Validação para quando for usar função signOut em um componente jsx ( que então irá usar o hook useRouter da função),
       ou se irá utilizar o signOut em uma função javascript ( api.ts ), que ai iria utilizar o hook da função signOut. 
    */
    if(Router === null ){ 
        const Router = useRouter();
    }

    try{
        // Remove os dados que foram armazenados no cookie, faznedo com que não passe dados do user na requisição
        destroyCookie(undefined,'@nextauth.token');
        // Vai para rota inicial
        Router.push('/');
    }catch(e){
        toast.error('Erro ao deslogar')
        console.log('Erro ao deslogar..' + e);
    }
}
export function AuthProvider({children}: AuthProviderProps){
    const [user,setUser] = useState<UserProps>();
    const isAuthenticated = !!user; // Caso a variável esteja vazia, será false
    const router = useRouter();

    useEffect(()=>{
        
        const { '@nextauth.token' : token } = parseCookies();  /* Verifica se no objeto existe alguma propriedade '@nextauth.token' e passa para variável token  */

        if(token){
            /* Se existir um token, fazer reqisição para /me e passar os dados da resopnse para o hook user. 
               Se deu algum erro na requisição, deslogar User          
            */
            api.get('/me').then( response => {
                const { id,name,email } = response.data;

                setUser({
                    id:id,
                    user:name,
                    email:email
                })
            }).catch(()=>{
                signOut(router);
            });
        }
    },[])

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

            toast.success('Logado com sucesso!');

            // Redirecionar para o Dashboard
            router.push('/dashboard');
        }catch(err){
            toast.error('Erro ao Acessar, ');
            console.log('Erro ao acessar.. ' +  err.response.data.error);
        }
    }

    async function signUp({name,email,password} : SignUpProps){
        try { 
            const response = await api.post('/users',{ 
                name:name,
                email:email,
                password:password
            })

            toast.success('Usuario criado com Sucesso! Bem vindo(a) ' + response.data.name)
        }catch(err){
            toast.error('Erro no cadastro');
            console.log('Erro no cadastro...' + err)
        }


        router.push('/');
    }

    return (
        <AuthContext.Provider value={{user,isAuthenticated,signIn,signOut,signUp}}>
            {children}
        </AuthContext.Provider>
    )
}