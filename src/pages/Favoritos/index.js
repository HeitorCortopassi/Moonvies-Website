import './favoritos.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos(){
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const minhaLista = localStorage.getItem("@moonvies");
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function excluirFilme(id){
         let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
         })

         setFilmes(filtroFilmes);
         localStorage.setItem("@moonvies", JSON.stringify(filtroFilmes));
         toast.success("Filme removido com sucesso!")
    }

    return(
        <div className="meus-filmes">
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && 
            <div className="filmes-salvos">
                <p>Você não possui nenhum filme salvo :(</p>
                <Link className="voltar-home" to="/">Voltar para Home</Link>
            </div>}
            <ul>
                {filmes.map((item) => {
                    return(
                        <>
                            <li key={item.id}>
                                <span>{item.title}</span>
                                <div>
                                    <Link className="detalhes" to={`/filme/${item.id}`}>Ver detalhes</Link>
                                    <button className="excluir-btn" onClick={() => excluirFilme(item.id)}>Excluir</button>
                                </div>

                            </li>
                            <hr/>
                        </>
                        
                    )
                })}
            </ul>
        </div>
    );
}

export default Favoritos;