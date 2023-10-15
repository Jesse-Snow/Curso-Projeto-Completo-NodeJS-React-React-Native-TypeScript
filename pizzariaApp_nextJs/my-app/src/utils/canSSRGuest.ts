import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next'
import {parseCookies} from 'nookies';

// Infos - 3 (SSR ServerSide Rendering - canSSRGuest )

export function canSSRGuest<P>(fn : GetServerSideProps<P> /* O fn é função getServerSideProps  */ ){
   
  /* Retorna uma Função getServerSideProps que retona um objeto com a propriedade redirect,
     caso não entre na validação dos cookies, será retornada a função getServerSideProps passada como parâmetro ( fn ) */
    return async ( ctx : GetServerSidePropsContext ) : Promise<GetServerSidePropsResult<P>> => {
        // O parâmetro ctx, é referente a requisição
        // Ação a ser tomada antes de renderiza página?
        const cookies = parseCookies(ctx)

        if(cookies['@nextauth.token']){
            return { 
                redirect:{
                    destination:'/dashboard',
                    permanent:false // Return a Temporary Redirect HTTP status (307)
                }
            }
        }

        return await fn(ctx); // Executando função do Next getServerSideProps para passar os dados como Props??
    }
    
}