import { useEffect, useState } from "react";
import DeleteImg from "../../assets/images/delete.svg";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import {Aside} from "../../components/Aside";

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
      .catch((error) => console.log(error));
  }

  async function removeTask(taskId: number) {
    api
      .delete(`tasks/${taskId}`)
      .then((response) => getTodos())
      .catch((error) => console.log(error));
  }

  async function updateTask(data: Todo) {
    api
      .put(`tasks/${data.id}`, {...data, tag: 'tag'})
      .then((response) => getTodos())
      .catch((error) => console.log(error));
  }

  async function toggleMarked(taskId: number) {
    api
      .post(`/tasks/mark/${taskId}`)
      .then((response) => getTodos())
      .catch((error) => console.log(error));
  }

  async function getTodos() {
    await api
      .get("/tasks")
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="main">
        <Aside/>
        <div className="content">
          <h1>TODO LIST</h1>
          <h2>Bem vindo(a), {user.name}</h2>
          <form onSubmit={addTask}>
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
            {todos.map((todo) => {
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
    </div>
  );
}
