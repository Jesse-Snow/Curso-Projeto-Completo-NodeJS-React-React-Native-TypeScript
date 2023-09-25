import Head from "next/head";
import Image from "next/image";

import logo from '../../public/logo.svg'

import styles from '../styles/home.module.scss';

import { Input } from "../components/ui/Input";

export default function Home() {
  return (
      <> {/* Fragment: Tag sem nome e sem estilização */}
      <Head>
        <title>Sujeito Pizza - Faça seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo Sujeito Pizza"/>
        <div className={styles.login}>
          <Input 
            type="text"
            placeholder="Digite seu e-mail"
          />

          <Input 
            type="password"
            placeholder="Digite sua senha"
          />
        </div>
      </div>
      </>
  )
}
