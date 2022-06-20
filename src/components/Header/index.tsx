import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <div>
          <Link to="/" >TODO</Link>
      </div>
      <nav>
        <ul>  
            <li><Link to="/login">Entrar</Link></li>
            <li><Link to="/register">Registrar</Link></li>
            <li><Link to="/login">Sair</Link></li>
        </ul>
      </nav>
    </header>
  )
}