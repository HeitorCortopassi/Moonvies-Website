import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=cd5f3fed4e1d2bd7fc153d043440e566&language=pt-BR
function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);


    //buscar api
    useEffect(()=> {
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "cd5f3fed4e1d2bd7fc153d043440e566",
                    language: "pt-BR",
                    page: 1,
                }
            })

            //console.log(response.data.results.slice(0, 10));
            setFilmes(response.data.results.slice(0, 15));
            setLoading(false);
        }

        loadFilmes();


    }, [])

    if(loading){
        return(
            <div>
                <h2 className="loading">Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme)=> {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;