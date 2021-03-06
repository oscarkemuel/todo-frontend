import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";
import { api } from "../../services/api";

export function Register() {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if(formData.get("confirm_password") !== data.password) {
      toast.error("Senhas distintas");
      return;
    }

    api
      .post("/user", data)
      .then(({data}) => {
        if(data === true){
          navigate('/login')
          toast.success('Usuário cadastrado com sucesso');
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  return (
    <div className="container">
      <Header />

      <h1>Register</h1>

      <div className="content">
        <form className="user-data-form-register" onSubmit={handleSubmit}>
          <div className="controls">
            <div className="control">
              <label>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Write your name"
                maxLength={32}
                minLength={1}
                required
              />
            </div>

            <div className="control">
              <label>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Write your email"
                required
              />
            </div>

            <div className="control">
              <label>Password</label>
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

            <div className="control">
              <label>Confirm your Password</label>
              <input
                type="password"
                placeholder="Confirm your pasword"
                id="confirm_password"
                name="confirm_password"
                maxLength={20}
                minLength={5}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
