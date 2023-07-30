import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import './style.css';

function Favoritos(){
    const [filmes,setFilmes] = useState([]);

    useEffect(() => {
        let minhaLista = localStorage.getItem("@primeFlix");

        setFilmes(JSON.parse(minhaLista) || []);


    },[])


    function excluirFilme(id){
        // Filtar filmes que não tem o parâmetor do ID passado, fazendo com que exclua o filme com o id passado
        const novaLista = filmes.filter( ( filmeValue) => {
            return filmeValue.id !== id;
        });
        setFilmes(novaLista);
        localStorage.setItem("@primeFlix",JSON.stringify(novaLista));
    }

    return (
        <div className="meus-filmes">
            <h1>Meus Filmes</h1>

            {/* Inline If with Logical && Operator, se a primeira expressão for TRUE, javascript irá retornar a segunda expressão */}
            { filmes.length === 0 && <span>Você não possui filmes salvos</span> }

            <ul>
                {filmes.map( filmeValue => {
                    return ( 
                        <li>
                            <span>{filmeValue.title}</span>
                            <div>
                                 <Link to={`/filme/${filmeValue.id}`}>Ver Detalhes</Link>
                                 <button onClick={() => excluirFilme(filmeValue.id)}>Excluir</button>
                            </div>
                        </li>

                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;