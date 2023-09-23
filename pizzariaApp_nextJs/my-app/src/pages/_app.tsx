// Estilo global
import '../styles/globals.scss'

import { AppProps } from 'next/app'

// Componente que irá redenrizar as pages ( outros componentes )
export default function App({ Component, pageProps } : AppProps) {
  return <Component {...pageProps} />
}
