import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

import { AuthTokenError } from './errors/AuthTokenError';

export function setupAPIClient(ctx = undefined){
    // Cookies?
    let cookies = parseCookies(ctx);

    // Instancia do Axios com configurações 
    const api = axios.create({
        baseURL:'http://localhost:3333',
        headers:{
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
                // Chama função que desloga usuario
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