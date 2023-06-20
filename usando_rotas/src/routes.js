import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './pages/Home'; // Se usar index, não precisa colocar aqui
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Produto from './pages/Produto';

function RouteApp(){
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/sobre' element={<Sobre/>} />
                <Route path='/contato' element={<Contato />} />
                <Route path='/produto/:id' element={<Produto/>} />


                <Route path='*' element={<NotFound />} />
            </Routes>        
        </ BrowserRouter>
    )
}

export default RouteApp;