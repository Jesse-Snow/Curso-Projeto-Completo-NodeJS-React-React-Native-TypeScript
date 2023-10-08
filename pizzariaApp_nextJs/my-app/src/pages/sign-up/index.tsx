import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import { useState,FormEvent } from 'react';
import Link from 'next/link';

import Head from "next/head"
import Image from "next/image"


import logo from '../../../public/logo.svg'

import styles from '../../styles/signUp.module.scss'

export default function SignUp(){
    const [loading,setLoading] = useState(false);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    async function handleSubmit(event : FormEvent){
      event.preventDefault();
      
      if( name === "" || email === "" || password === ""){
        alert('Preencha todos os campos');
        return;
      }
      
      setLoading(true);


    }

    return (
        <>
          <Head>
            <title>Sujeito Pizza - Cadastre-se</title>
          </Head>
          <div className={styles.containerCenter}>
            <Image src={logo} alt="Logo Sujeito Pizza" />
            <div className={styles.signUp}>
                <h1>Crie sua conta</h1>

                <form onSubmit={handleSubmit}>
                  <Input 
                    type="text"
                    placeholder="Digite seu Nome"
                    value={name}
                    onChange={(e) => { setName(e.target.value)} }
                  />

                  <Input 
                    type="text"
                    placeholder="Digite seu E-mail"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />

                  <Input 
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value )}}
                  />

                  <Button
                    type="submit"
                    loading={loading}
                  >
                    Criar Conta
                  </Button>

                  <Link className={styles.text} href="/">
                    Já possuo uma conta 
                  </Link>

                </form>
            </div>
          </div>

        </>
    )
}