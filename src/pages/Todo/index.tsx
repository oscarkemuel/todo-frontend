import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteImg from "../../assets/images/delete.svg";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

type Todo = {
  id: number;
  marked: number;
  name: string;
  tag: string;
  description: string;
};

export function Todo() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterString, setFilterString] = useState('');

  async function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      description: formData.get("tag"),
      tag: "tag",
    };

    api
      .post("/tasks", data)
      .then((response) => {
        console.log(response.data);
        getTodos();
      })
      .catch((error) => toast.error(error.response.data.message));
  }

  async function removeTask(taskId: number) {
    api
      .delete(`tasks/${taskId}`)
      .then((response) => getTodos())
      .catch((error) => toast.error(error.response.data.message));
  }

  async function updateTask(data: Todo) {
    api
      .put(`tasks/${data.id}`, {...data, tag: 'tag'})
      .then((response) => getTodos())
      .catch((error) => toast.error(error.response.data.message));
  }

  async function toggleMarked(taskId: number) {
    api
      .post(`/tasks/mark/${taskId}`)
      .then((response) => getTodos())
      .catch((error) => toast.error(error.response.data.message));
  }

  async function getTodos() {
    await api
      .get("/tasks")
      .then((response) => setTodos(response.data))
      .catch((error) => toast.error(error.response.data.message));
  }

  useEffect(() => {
    getTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    return todo.name.toLowerCase().includes(filterString.toLowerCase())
      || todo.description.toLowerCase().includes(filterString.toLowerCase());
  });

  return (
    <div className="container">
      <Header />

      <h1>TODO LIST</h1>
      <h2>Bem vindo(a), {user.name} 😃</h2>

      <div className="content">
        <form onSubmit={addTask}>
          <div className="controls">
            <div className="control">
              <label>Nome</label>
              <input
                type="text"
                placeholder="Insira a tarefa"
                id="name"
                name="name"
                required
              />
            </div>

            <div className="control">
              <label>Tag</label>
              <input
                type="text"
                placeholder="Insira a tag"
                id="tag"
                name="tag"
                required
              />
            </div>
          </div>

          <input type="submit" value="ADD" className="submit-btn" />
        </form>

        <form>
          <div className="control">
            <label>Filtro 🔍</label>
            <input
              type="text"
              placeholder="Perquise for nome ou tag"
              id="filter"
              name="filter"
              onChange={(event) => setFilterString(event.target.value)}
            />
          </div>
        </form>

        <div className="todos">
          {!filteredTodos.length && (
            <div className="no-todos">
              <p>Nenhuma tarefa encontrada!!!</p>
            </div>
          )}
          {filteredTodos.map((todo) => {
            return (
              <div className="todo" key={todo.id.toString()}>
                <div className="half-items todo-infos">
                  <button
                    className={`done ${todo.marked ? "checked" : ""}`}
                    onClick={() => toggleMarked(todo.id)}
                  >
                    <div></div>
                  </button>
                  <input
                    className="name"
                    type="text"
                    defaultValue={todo.name}
                    onBlur={(event) => updateTask({...todo, name: event.target.value})}
                  />
                </div>
                <div className="half-items">
                  <div className="tag">
                    <p> {todo.description} </p>
                  </div>
                  <button
                    className="delete"
                    onClick={() => removeTask(todo.id)}
                  >
                    <img src={DeleteImg} alt="delete" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
