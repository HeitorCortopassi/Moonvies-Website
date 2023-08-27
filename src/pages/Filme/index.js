import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import './filme-info.css';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "cd5f3fed4e1d2bd7fc153d043440e566",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();

        return() => {
            console.log("componente desmontado");
        }
    }, [navigate, id])


    function salvarFilme() {
        const minhaLista = localStorage.getItem("@moonvies");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        //verificar se tem o filme já salvo
        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme) {
            toast.warn("Esse filme já está na sua lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@moonvies", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")

    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }


    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <span className="data">{filme.release_date}</span>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span className="resumo">{filme.overview}</span>
            <br/>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;