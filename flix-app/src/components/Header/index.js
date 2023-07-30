import './header.css';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <header>
            {/* Link component é como uma tag de âncora */}
            <Link className='logo' to='/'>Prime Flix</Link>
            <Link className='favoritos' to='/favoritos'>Meus Filmes</Link>
        </header>
    )
}

export default Header;