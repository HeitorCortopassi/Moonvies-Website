import './header.css';
import { Link } from 'react-router-dom';
import Logo from "../../imgs/logo.png";

export default function Header() {
    return(
        <header>
            <div className="divlogo">
                <Link className="logo" to="/"><img className="imgLogo" src={Logo}/></Link>
            </div>
            <Link className="favoritos" to="/favoritos">Meus filmes</Link>
        </header>
    );
}