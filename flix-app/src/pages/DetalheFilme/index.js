
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import apiKey from '../../services/key.json';
import api from "../../services/api";
import './style.css';

function DetalheFilme(){
    const { id } = useParams();
    const [ filme,setFilme ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key:apiKey[0].key,
                    language:"pt-BR"
                }
            }).then(response => {
                setFilme(response.data);
                console.log(response.data);
                setLoading(false);
            }).catch(() => console.log("Filme não encontrado"))
            ;
        }

        loadFilme();

        return () => { console.log("Componente desmontado")}
    },[])

    if(loading) {
        return (
            <div className="filme-info">
                <h1>Carregando filme...</h1>
            </div>
        )
    }


    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span><br/>
            <strong>Avaliação {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button>Salvar</button>
                <button>
                    <a href="#">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default DetalheFilme; 