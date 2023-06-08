import React,{ useEffect,useState } from "react";
import './style.css'

function App() {
  const [blogPost, setBlogPost] = useState([]);  
  
  useEffect(()=> {

    function loadApi(){
      let url = 'https://sujeitoprogramador.com/rn-api/?api=posts'
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setBlogPost(res)
          console.log(res)
        })
    }

    loadApi();

  },[]);  



  return (
    <div className="container">
      <header className="postHeader">
        <strong>Dicas de Saúde</strong>
      </header>

      {  blogPost.map((post) => {
        return (
          <article key={post.id} className="postArticle">
            <strong className="postTitle">{post.titulo}</strong>
            <img src={post.capa} alt={post.titulo} className="postCapa" />
            <p className="subtitulo">
              {post.subtitulo}
            </p>
            <a className="botao">Acessar</a>
          </article>
        )
      }) }
    </div>
  );
}

export default App;
