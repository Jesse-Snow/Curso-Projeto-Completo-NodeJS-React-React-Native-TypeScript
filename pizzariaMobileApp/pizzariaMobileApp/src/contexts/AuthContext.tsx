import {createContext,ReactNode,useState} from 'react';


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean
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

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({children} : AuthProviderProps){
    const [user,setUser] = useState<UserProps>({
        id:'',
        name:'',
        email:'',
        token:''
    });
    const isAuthenticated = !!user.name; // Converter em boolean

    return (
        <AuthContext.Provider value={{user,isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}