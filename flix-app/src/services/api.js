import axios from 'axios'
// Base da api: https://api.themoviedb.org/3/

// Url 
// https://api.themoviedb.org/3/trending/movie/day?language=pt-br&api_key=keyDaApi

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;