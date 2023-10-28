import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header'

import { FiUpload } from 'react-icons/fi';

import { canSSRAuth } from '../../utils/canSSRAuth';

import { useState,ChangeEvent,FormEvent } from 'react';

import { setupAPIClient } from '../../services/api';

import { toast } from 'react-toastify';

interface CategoryProps { 
  id: string
  name: string;
}

interface ProductProps {
  category: CategoryProps[];
}


export default function Product(props: ProductProps){
    const [avatarUrl,setAvatarUrl] = useState('');
    const [avatarImage,setAvatarImage] = useState(null);
    const [category] = useState(props.category || []);
    const [categorySelected, setCategorySelected] = useState('');
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');



    function handleChange(e: ChangeEvent<HTMLInputElement>){

      if(!e.target.files){ // Caso não haja arquivos selecionados
        return;
      }

      const image = e.target.files[0]; // Selecionar apenas 1 arquivo selecionado

      if(!image){
        return;
      }

      if(image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg'){
        setAvatarImage(image);
        setAvatarUrl(URL.createObjectURL(image));
      }
    }

    function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>){
      setCategorySelected(e.target.value);
    }

    async function handleSubmit(event: FormEvent){
      event.preventDefault();
      
      try {
        const data = new FormData();

        if(name === '' || price === '' || description === '' || avatarImage === null || category.length <= 0){
          toast.warning('Preencha os Campos');
          return;
        }
        
        data.append('name',name);
        data.append('price',price);
        data.append('description',description);
        data.append('file',avatarImage);
        data.append('category_id',category[categorySelected].id)

        const api = setupAPIClient();
        await api.post('/product',data);

        toast.success('Produto Cadastrado com Sucesso!');
      }
      catch(err){
        console.log(err);
        toast.error('Erro ao cadastrar Produto');
      }

      setName('');
      setPrice('');
      setDescription('');
      setAvatarImage(null);
      setAvatarUrl('');

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
                <form className={styles.form} onSubmit={handleSubmit}>

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

                    <select value={categorySelected} onChange={handleCategoryChange}>
                        {category && (
                          category.map((categoryValue,index) => {
                            return (
                              <option key={categoryValue.id} value={index}>{categoryValue.name}</option>
                            )
                          })
                        )}
                    </select>

                    <input
                      placeholder='Digite o nome do Produto'
                      type='text'
                      className={styles.input}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <input 
                      placeholder='Preço do Produto'
                      type='text'
                      className={styles.input}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />  

                    <textarea 
                      placeholder='Descreva o produto..'
                      className={styles.textarea}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
    const api = setupAPIClient(ctx);

    const response = await api.get('/category');
  
    return {
        props:{ category:response.data}
    }
});