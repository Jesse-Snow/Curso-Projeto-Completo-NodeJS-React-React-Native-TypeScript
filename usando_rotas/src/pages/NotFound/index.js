import {Link} from 'react-router-dom';

function NotFound(){
    return(
        <div>
            <h1>Página não encontrada...</h1>
            <h2>Tente as opções abaixo:</h2><br/>
            <Link to='/'>Home</Link><br/>
            <Link to='/sobre'>Sobre</Link><br/>
            <Link to='/contato'>Contato</Link>
        </div>
    )
}

export default NotFound;