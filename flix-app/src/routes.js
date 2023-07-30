import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import DetalheFilme from './pages/DetalheFilme';
import Header from './components/Header';
import Erro from './pages/Erro';
import Favoritos from './pages/Favoritos';

function RoutesApp(){
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/filme/:id' element={<DetalheFilme/>} />
                <Route path='/favoritos' element={<Favoritos/>} />


                {/* Recomenado usar rota de não encontrado por último */}
                <Route path='*' element={<Erro/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;