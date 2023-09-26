import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import { useState } from 'react';
import Link from 'next/link';

import Head from "next/head"
import Image from "next/image"


import logo from '../../../public/logo.svg'

import styles from '../../styles/signUp.module.scss'

export default function SignUp(){
    const [loading,setLoading] = useState(false);

    return (
        <>
          <Head>
            <title>Sujeito Pizza - Cadastre-se</title>
          </Head>
          <div className={styles.containerCenter}>
            <Image src={logo} alt="Logo Sujeito Pizza" />
            <div className={styles.signUp}>
                <h1>Crie sua conta</h1>

                <form>
                  <Input 
                    type="text"
                    placeholder="Digite seu Nome"
                  />

                  <Input 
                    type="text"
                    placeholder="Digite seu E-mail"
                  />

                  <Input 
                    type="text"
                    placeholder="Digite sua senha"
                  />

                  <Button
                    type="submit"
                    disabled={loading}
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