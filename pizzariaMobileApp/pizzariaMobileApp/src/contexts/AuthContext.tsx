import {createContext,ReactNode,useState,useEffect} from 'react';

import { api } from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: ( credentials: SignInProps) => Promise<void>;
    loading: boolean;
    loadingAuth: boolean
    signOut: () => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({children} : AuthProviderProps){

    useEffect(()=>{

        async function getUser(){
            const user = await AsyncStorage.getItem('@sujeitopizzaria');

            const hasUser: UserProps= JSON.parse(user || '{}' );

            // Verifica se objeto tem algum atributo
            if(Object.keys(hasUser).length > 0){
                // Passando token no Authorization nas outras requisições
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;

                setUser({ 
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }

            setLoading(false);
        }

        getUser();

    },[])

    const [user,setUser] = useState<UserProps>({
        id:'',
        name:'',
        email:'',
        token:''
    });

    const [loadingAuth,setLoadingAuth] = useState(false); // ???
    const [loading,setLoading] = useState(true);

    const isAuthenticated = !!user.name; // Converter em boolean

    async function signIn({ email, password}: SignInProps){
        setLoadingAuth(true);

        try{
            const response = await api.post('/session',{ email:email, password:password});
            //console.log(response.data);

            const { id,name,token } = response.data;
            
            setUser({
                id:id,
                name:name,
                token:token,
                email:email
            })
            setLoadingAuth(false); 

            // Guardando dados localmente com asyncStorage
            const data = {...response.data};
            await AsyncStorage.setItem('@sujeitopizzaria',JSON.stringify(data));
            
            // Passando token no Authorization nas outras requisições
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        }catch(err){
            console.log('Erro ao autenticar: ',err);
        }
        setLoadingAuth(false);

    }

    async function signOut(){
        setLoading(true);
        await AsyncStorage.clear().then( () => {
            setUser({
                id:'',
                name:'',
                email:'',
                token:''
            })
          }
        )
        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{user,isAuthenticated,signIn,loading,loadingAuth,signOut}}>
            {children}
        </AuthContext.Provider>
    )
}