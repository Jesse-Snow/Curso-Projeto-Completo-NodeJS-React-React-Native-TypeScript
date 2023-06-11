import {Link} from 'react-router-dom';

function Contato(){
    return(
      <div>
        <h1>Contado da Empresa</h1>
        <p>Telefone (ddd) xxxx-xxxx</p><br/><br/>
        <Link to='/'>Home</Link><br/>
        <Link to='/sobre'>Sobre</Link>
      </div>
    );
}

export default Contato;