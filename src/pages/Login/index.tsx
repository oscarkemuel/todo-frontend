import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";

export function Login() {
  const { handleLogin } = useAuth();
  
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string
    };

    handleLogin(data); 
  }

  return (
    <div className="container">
      <Header />

      <h1>Log in</h1>

      <div className="content">
        <form className="user-data-form-login" onSubmit={handleSubmit}>
          <div className="controls">
            <div className="control">
              <label>Email</label>
              <input
                type="email"
                placeholder="Write your email"
                id="email"
                name="email"
                required
              />
            </div>

            <div className="control">
              <label>Senha</label>
              <input
                type="password"
                placeholder="Write your password"
                id="password"
                name="password"
                maxLength={20}
                minLength={5}
                required
              />
            </div>
          </div>

          <input type="submit" value="Send" className="submit-btn" />
        </form>
      </div>

      <p className="user-msg">
        Don't have an account yet?
        <br />
      </p>
      <Link className="user-msg" id="register-link" to="/register">
        Create an account
      </Link>
    </div>
  );
}
