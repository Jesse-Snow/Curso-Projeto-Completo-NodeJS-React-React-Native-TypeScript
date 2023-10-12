import Head from "next/head";
import Image from "next/image";

import logo from '../../public/logo.svg'

import styles from '../styles/home.module.scss';

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button"
import Link from 'next/link';
import { useState, useContext, FormEvent} from "react";

import { AuthContext } from '../contexts/AuthContext';

import { toast } from 'react-toastify';

export default function Home() {
  const [loading,setLoading] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent ){ 
    event.preventDefault();

    if( email === "" || password === ""){
      toast.warning("Preencha Email e Senha");
      return;
    }

    setLoading(true);

    const data = {
      email:email,
      password:password
    };

    await signIn(data);
    setLoading(false);
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
                value={email}
                onChange={ (e) => setEmail(e.target.value) }
              />

              <Input 
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={ (e) => setPassword(e.target.value) }
              />

              <Button 
                type="submit"
                loading={loading}
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
