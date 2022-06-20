import { Link } from "react-router-dom";
import { Header } from "../../components/Header";

export function Login() {
  return (
    <div className="container">
   
    <Header />

    <h1>Log in</h1>

    <div className="content">
        <form className="user-data-form-login">
            <div className="controls">
                <div className="control">
                    <label>Username</label>
                    <input type="text" placeholder="Write your username" id="username" name="username"
                           maxLength={20} minLength={5} required />
                </div>

                <div className="control">
                    <label>Senha</label>
                    <input type="password" placeholder="Write your password" id="password" name="password"
                           maxLength={20} minLength={5} required />
                </div>
            </div>

            <input type="submit" value="Send" className="submit-btn" />
        </form>
    </div>
    <p className="user-msg">Don't have an account yet?<br /></p>
    <Link  className="user-msg" id="register-link" to="/register">Create an account</Link>
</div>
  )
}