import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function Header() {
  const { userIsLogged, handleLogOut } = useAuth()

  return (
    <header>
      <div>
          <Link to="/" >TODO</Link>
      </div>
      <nav>
        <ul>  
            <li><Link to="/login">Entrar</Link></li>
            <li><Link to="/register">Registrar</Link></li>
            {userIsLogged && 
            <li onClick={handleLogOut} style={{cursor: 'pointer'}}>Sair</li>}
        </ul>
      </nav>
    </header>
  )
}