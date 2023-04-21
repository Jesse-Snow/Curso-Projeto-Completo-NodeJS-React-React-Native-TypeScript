import Nome from './components/Nome.js'
import {useState} from 'react'

function App() {
  const [meuNumero,setMeuNumero] = useState(1);

  function handleClick(numero){
    setMeuNumero(numero);
  }

  return (
     <div>
      <h1>Welcome to React!</h1>
      <Nome guerreiro="Conan" idade="30" />
      <br/>
      <span>Teste do useState Número: {meuNumero}</span>
      <br/>
      <button onClick={ () => handleClick("200")}>
        Botão
      </button>
     </div>
  );
}

export default App;
