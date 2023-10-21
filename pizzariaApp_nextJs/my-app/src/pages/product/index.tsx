import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header'

import { canSSRAuth } from '../../utils/canSSRAuth';


export default function Product(){
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