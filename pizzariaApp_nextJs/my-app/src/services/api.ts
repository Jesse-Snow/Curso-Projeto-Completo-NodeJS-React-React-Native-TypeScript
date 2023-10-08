import axios, { AxiosError } from 'axios';
import { parseCookies,setCookie,destroyCookie } from 'nookies';

import { AuthTokenError } from './errors/AuthTokenError';

import { signOut } from '../contexts/AuthContext';

export function setupAPIClient(ctx = undefined){
    // Para client side, o ctx pode ser omitido, ou posto para undefined ou null
    // Irá pegar os cookies do browser e por em um objeto
    let cookies = parseCookies(ctx);
    
    const api = axios.create({
        baseURL:'http://localhost:3333',
        headers:{
            // Irá adicionar ao Authorization do header, o Bearer + o atributo do objeto cookies que se chama @nextauth.token
            Authorization: `Bearer ${cookies['@nextauth.token']}` // Notação Colchetes, acessa atributo do objeto com o [], é o mesmo que objeto.atributo
        }
    });

    // Intecepta response, e faz algo antes de trazer a response
    api.interceptors.response.use(response => {
        return response;
    },(error: AxiosError) => {
        // Para qualquer erro 401, deslogar usuario
        if(error.response.status === 401){
            // Se requisição for feita com o objeto window ( browser ) 
            if( typeof window !== undefined){
                // Chama função que desloga usuario ( Removendo dados do cookie[ que possui o token] e indo para rota inicial)
                signOut();
            }
            // Caso a requisição não tenha sido feita por um browser
            else {
                return Promise.reject(new AuthTokenError());
            }
        }
        // Caso tenha sido outro erro da response
        else { 
            return Promise.reject(error);
        }
    })

    return api;
}