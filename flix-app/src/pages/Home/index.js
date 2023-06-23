import {useEffect,useState} from 'react';
import api from '../../services/api';
import apiKey from '../../services/key.json';
import './home.css'
import { Link } from 'react-router-dom';

function Home(){
    const [filme,setFilme] = useState([]);

    useEffect(()=>{

         async function loadFilmes(){
            const response = await api.get('movie/now_playing',{
                params:{
                    api_key:apiKey[0].key,
                    language:"pt-BR",
                    page:1,
                }
            })
            //console.log(response.data.results.slice(0,10));               
            setFilme(response.data.results.slice(0,10));
        }

        loadFilmes();
        
    },[])

    
    return (
        <div className='container'>
            <div className='lista-filmes'>
                {filme.map( filmeResponse =>{
                    return (
                        <article key={filmeResponse.id}>
                            <strong>{filmeResponse.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filmeResponse.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filmeResponse.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>            
        </div>
    )
}

export default Home;