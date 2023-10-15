import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import {parseCookies,destroyCookie } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';

export function canSSRAuth<P>( fn: GetServerSideProps<P>){
    return async ( ctx : GetServerSidePropsContext ) : Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        if(!cookies['@nextauth.token']){
            return {
                redirect:{
                    destination:'/',
                    permanent:false 
                }                
            }
        }

        try { 
            return await fn(ctx);
        }catch(err) { // Caso exista algum token,porém deu algum erro, deslogar user / destruir cookie 
            if(err instanceof AuthTokenError){
                destroyCookie(ctx,cookies['@nextauth.token']); // Destruir cookie, passando contexto como parâmetro pois está sendo chamado no server side
                return {
                    redirect:{
                        destination:'/',
                        permanent:false
                    }
                }
            }
        }
    }
}