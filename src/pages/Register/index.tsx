import { Header } from "../../components/Header";

export function Register() {
  return (
    <div className="container">
      <Header />

      <h1>Registration</h1>

      <div className="content">
        <form className="user-data-form-register">
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
              <label>Surnames</label>
              <input
                type="text"
                id="surnames"
                name="surnames"
                placeholder="Write your surname"
                maxLength={64}
                minLength={1}
                required
              />
            </div>

            <div className="control">
              <label>Username</label>
              <input
                type="text"
                placeholder="Write your username"
                id="username"
                name="username"
                maxLength={20}
                minLength={5}
                required
              />
            </div>

            <div className="control">
              <label>Birth date</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                placeholder="Write your birth date"
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
              <label>Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Write your telephone"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
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
              <label>Password</label>
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

          <input type="submit" value="Send" className="submit-btn" />
        </form>
      </div>
    </div>
  );
}
