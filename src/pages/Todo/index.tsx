import { useEffect, useState } from "react";
import DeleteImg from "../../assets/images/delete.svg";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

type Todo = {
  id: number;
  marked: number;
  name: string;
  tagName: string;
  description: string;
}

export function Todo() {
  const navigate = useNavigate();
  const { userIsLogged, user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([])

  async function addTask(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get('name'),
      description: formData.get('tag'),
      tag: 'tag'
    };

    api
    .post('/tasks', data)
    .then((response) => {
      console.log(response.data)
      getTodos();
    })
    .catch((error) => console.log(error))
  }

  async function removeTask(taskId: number){
    api
    .delete(`tasks/${taskId}`)
    .then((response) => getTodos())
    .catch((error) => console.log(error))
  }

  async function toggleMarked(taskId: number){
    api
    .post(`/tasks/mark/${taskId}`)
    .then((response) => getTodos())
    .catch((error) => console.log(error));
  }

  async function getTodos(){
    await api
    .get('/tasks')
    .then((response) => setTodos(response.data))
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    if(!userIsLogged){
      navigate('/login')
    }

    getTodos();
  }, [])

  return (
    <div className="container">
      <Header />

      <h1>{user.name} - TODO LIST</h1>

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
                <button className={`done ${todo.marked ? 'checked' : ''}`}></button>
                <p className="name">{todo.name}</p>
              </div>
              <div className="half-items">
                <div className="tag">
                  <p> {todo.description} </p>
                </div>
                <button className="delete" onClick={() => removeTask(todo.id)}>
                  <img src={DeleteImg} alt="delete" />
                </button>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
