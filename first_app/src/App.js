import Nome from './components/Nome.js'
import {useState} from 'react'

function App() {
  const [input,setInput] = useState('');
  const [tarefa,setTarefa] = useState([
    'Comer brocolis',
    'Assar Cenoura'
  ]);

  function handleSubmit(event){
    event.preventDefault();

    setTarefa([...tarefa,input]);
    setInput('');
  }

  return (
     <div>
      <h1>Cadastro de usuário</h1>

      <form onSubmit={handleSubmit}>
        <label>Nome da Tarefa:</label><br/>
        <input value = {input} onChange={(e) => setInput(e.target.value)} placeholder='Digite a tarefa'></input><br/>
        
        <input type='submit' value='Enviar'></input>
      </form>


      <div>
        <ul>
          {tarefa.map( algumaTarefa => (
            <li key={algumaTarefa}>{algumaTarefa}</li>
          ))}
        </ul>

      </div>
     </div>
  );
}

export default App;
