import DeleteImg from "../../assets/images/delete.svg";
import { Header } from "../../components/Header";

export function Todo() {
  return (
    <div className="container">
      <Header />

      <h1>TODO LIST</h1>

      <div className="content">
        <form>
          <div className="controls">
            <div className="control">
              <label>Nome</label>
              <input
                type="text"
                placeholder="Insira a tarefa"
                id="name"
                name="name"
              />
            </div>

            <div className="control">
              <label>Tag</label>
              <input
                type="text"
                placeholder="Insira a tag"
                id="tag"
                name="tag"
              />
            </div>
          </div>

          <input type="submit" value="ADD" className="submit-btn" />
        </form>

        <div className="todos">
          <div className="todo">
            <div className="half-items todo-infos">
              <button className="done checked"></button>
              <p className="name">Ir Pedalar</p>
            </div>
            <div className="half-items">
              <div className="tag">
                <p> Tag name </p>
              </div>
              <button className="delete">
                <img src={DeleteImg} alt="delete" />
              </button>
            </div>
          </div>

          <div className="todo">
            <div className="half-items todo-infos">
              <button className="done"></button>
              <p className="name">Fazer trabalho</p>
            </div>
            <div className="half-items">
              <div className="tag">
                <p> Tag name </p>
              </div>
              <button className="delete">
                <img src={DeleteImg} alt="delete" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
