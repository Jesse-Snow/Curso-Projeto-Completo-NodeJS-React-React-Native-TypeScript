import Nome from './components/Nome.js'
import {useState} from 'react'

function App() {
  const [nome,setNome] = useState('');
  const [idade,setIdade] = useState('');
  const [email,setEmail] = useState('');
  const [user,setUser] = useState({});

  function handleSubmit(event){
    event.preventDefault();

    setUser({
      name:nome,
      age:idade,
      email:email
    });
    alert('Usuário Cadastrado');
  }

  return (
     <div>
      <h1>Cadastro de usuário</h1>

      <form onSubmit={handleSubmit}>
        <label>Nome:</label><br/>
        <input value = {nome} onChange={(e) => setNome(e.target.value)} placeholder='Digite seu nome'></input><br/>

        <label>Idade:</label><br/>
        <input input value = {idade} onChange={(e) => setIdade(e.target.value)} placeholder='Digite sua idade'></input><br/>

        <label>Email:</label><br/>
        <input input value = {email} onChange={(e) => setEmail(e.target.value)} placeholder='Digite seu Email'></input><br/>

        <input type='submit' value='Enviar'></input>
      </form>

      <div>
        <span>Bem vindo {user.name}</span><br/>
        <span>Idade: {user.age}</span><br/>
        <span>Email: {user.email}</span><br/>
      </div>
     </div>
  );
}

export default App;
