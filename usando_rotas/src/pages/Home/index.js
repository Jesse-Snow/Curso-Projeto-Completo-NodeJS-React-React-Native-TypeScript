import {Link} from 'react-router-dom';

function Home(){
    return (
        <div>
            <h1>Bem vindo a página <strong>Home</strong></h1><br/><br/>
            <Link to='/sobre'>Sobre</Link><br/>
            <Link to='/contato'>Contato</Link>

            <hr/><br/>
            <Link to='/produto/500'>Ir para Produto 500</Link>
        </div>
    )
}

export default Home;