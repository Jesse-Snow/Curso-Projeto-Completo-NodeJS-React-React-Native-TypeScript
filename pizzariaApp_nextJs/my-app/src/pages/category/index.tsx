import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header';
import { useState, FormEvent} from 'react';

import { api } from '../../services/apiClient';

import { toast } from 'react-toastify';

export default function Category(){
    const [name,setName ] = useState('');

    async function handleRegister(event: FormEvent){
        event.preventDefault();
        
        if(!name){
            toast.warning("Digite uma Categoria")
            return;
        }

        try{
            const response = await api.post('/category',{ name:name});
            toast.success(`Categoria "${response.data.name}" criada com Sucesso!`)
        }catch(err){
            toast.error("Erro ao criar categoria");
            console.log(err);
        }
        
        setName('');
    }

    return (
        <>
          <Head>
            <title>Nova Categoria - Sujeito Pizzaria</title>
          </Head>
          <div>
            <Header />
            <main className={styles.container}>
                <h1>Cadastrar categorias</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input 
                      type='text'
                      placeholder='Digite uma nova Categoria'
                      className={styles.input}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button 
                      className={styles.buttonAdd} 
                      type='submit'
                    >
                        Cadastrar
                    </button>
                </form>
            </main>
          </div>
        </>
    )
}