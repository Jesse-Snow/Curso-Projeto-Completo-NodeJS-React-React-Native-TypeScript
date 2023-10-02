import Head from "next/head";
import Image from "next/image";

import logo from '../../public/logo.svg'

import styles from '../styles/home.module.scss';

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button"
import Link from 'next/link';
import { useState, useContext, FormEvent} from "react";

import { AuthContext } from '../contexts/AuthContext';

export default function Home() {
  const [loading,setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent ){ 
    event.preventDefault();

    const data = {
      email:"teste",
      password:"123123"
    };

    await signIn(data);

  }

  return (
      <> {/* Fragment: Tag sem nome e sem estilização */}
      <Head>
        <title>Sujeito Pizza - Faça seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo Sujeito Pizza"/>
        <div className={styles.login}>
          <form onSubmit={handleSubmit}>    
              <Input 
                type="text"
                placeholder="Digite seu e-mail"
              />

              <Input 
                type="password"
                placeholder="Digite sua senha"
              />

              <Button 
                type="submit"
                disabled={loading}
              >
                Acessar
              </Button>

              <Link className={styles.text} href="/sign-up">
                    Não possui uma conta? Cadastre-se
              </Link>

          </form>
        </div>
      </div>
      </>
  )
}
