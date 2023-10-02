// Estilo global
import '../styles/globals.scss'

import { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext';

// Componente que irá redenrizar as pages ( outros componentes )
export default function App({ Component, pageProps } : AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />  
    </AuthProvider>
  )
}
