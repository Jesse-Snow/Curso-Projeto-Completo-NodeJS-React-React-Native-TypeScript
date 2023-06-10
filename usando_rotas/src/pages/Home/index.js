import {Link} from 'react-router-dom';

function Home(){
    return (
        <div>
            <h1>Bem vindo a página <strong>Home</strong></h1><br/><br/>
            <Link to='/sobre'>Sobre</Link><br/>
            <Link to='/contato'>Contato</Link>
        </div>
    )
}

export default Home;