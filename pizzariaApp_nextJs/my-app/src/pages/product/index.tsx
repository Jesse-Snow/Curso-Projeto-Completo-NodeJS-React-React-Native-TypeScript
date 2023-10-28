import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header'

import { FiUpload } from 'react-icons/fi';

import { canSSRAuth } from '../../utils/canSSRAuth';

import { useState,ChangeEvent } from 'react';


export default function Product(){
    const [avatarUrl,setAvatarUrl] = useState(null);

    function handleChange(e: ChangeEvent<HTMLInputElement>){

      if(!e.target.files){ // Caso não haja arquivos selecionados
        return;
      }

      const image = e.target.files[0]; // Selecionar apenas 1 arquivo selecionado

      if(!image){
        return;
      }

      if(image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg'){
        setAvatarUrl(URL.createObjectURL(image));
      }
    }


    return (
        <>
          <Head>
            <title>Produtos - Sujeito Pizzaria</title>
          </Head>
          <div>
            <Header />  
            <main className={styles.container}>
                <h1>Novo Produto</h1>
                <form className={styles.form}>

                    <label className={styles.labelAvatar}>
                      <span>
                        <FiUpload size={30} color='#FFF'/>
                      </span>

                      <input type='file' accept='image/png, image/jpeg, image/jpg' onChange={handleChange}/>

                      { avatarUrl && 
                        ( <img 
                          className={styles.preview}
                          src={avatarUrl}
                          alt='Foto do Produto'
                          width={250}
                          height={250}
                          />
                        )
                      }
                      
                    </label>

                    <select>
                        <option>Alguma Categoria</option>
                        <option>Outra Categoria</option>
                    </select>

                    <input
                      placeholder='Digite o nome do Produto'
                      type='text'
                      className={styles.input}
                    />

                    <input 
                      placeholder='Preço do Produto'
                      type='text'
                      className={styles.input}
                    />  

                    <textarea 
                      placeholder='Descreva o produto..'
                      className={styles.textarea}
                    /> 

                    <button
                      type='submit'
                      className={styles.button}
                    >
                        Cadastrar
                    </button>
                </form>
            </main>
          </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props:{}
    }
});