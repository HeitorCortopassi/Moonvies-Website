import axios from 'axios';
// Base da URL: https://api.themoviedb.org/3/
//URL da api: https://api.themoviedb.org/3/movie/now_playing?api_key=cd5f3fed4e1d2bd7fc153d043440e566&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;