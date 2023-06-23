import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import MeusFilmes from './pages/MeusFilmes';
import Header from './components/Header';

function RoutesApp(){
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/filme/:id' element={<MeusFilmes/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;