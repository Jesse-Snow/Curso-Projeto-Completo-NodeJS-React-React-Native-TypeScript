import Nome from './components/Nome.js'
import {useState} from 'react'

// Componente App
function App() {
  // [nomeDoHook,acessorDoHook] = useState(valorPadrão/tipoDoHook);
  const [input,setInput] = useState('');
  const [tarefa,setTarefa] = useState([
    'Comer brocolis',
    'Assar Cenoura'
  ]);

  function handleSubmit(event){
    // Previnir do evento do form limpar o form
    event.preventDefault();

    setTarefa([...tarefa,input]);
    setInput('');
  }

  // Retorno de JSX
  return (
     <div>
      <h1>Cadastro de usuário</h1>

      <form onSubmit={handleSubmit}>
        <label>Nome da Tarefa:</label><br/>

        {/* O valor do input será o Hook input, e ao mudar/digitar no elemento input do html uma função irá inserir
        o valor do input */}
        <input value = {input} onChange={(e) => setInput(e.target.value)} placeholder='Digite a tarefa'></input><br/>
        
        <input type='submit' value='Enviar'></input>
      </form>


      <div>
        <ul>
          {/* Será percorrido o array tarefa para retornar uma lista com os valores do array */}
          {tarefa.map( algumaTarefa => (
            <li key={algumaTarefa}>{algumaTarefa}</li>
          ))}
        </ul>

      </div>
     </div>
  );
}

export default App;
