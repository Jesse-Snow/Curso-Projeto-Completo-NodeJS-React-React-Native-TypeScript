// Estilo global
import '../styles/globals.scss'

import { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Componente que irá redenrizar as pages ( outros componentes )
export default function App({ Component, pageProps } : AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />  
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  )
}
