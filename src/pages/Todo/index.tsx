import { useEffect, useState } from "react";
import DeleteImg from "../../assets/images/delete.svg";
import { Header } from "../../components/Header";
// import { api } from "../../services/api";

type Todo = {
  id: Number;
  checked: Boolean;
  name: String;
  tagName: String;
}

type TodoInput = {
  name: String;
  tag: String;
}

const data: Todo[] = [
  {
    id: 1,
    checked: true,
    name: 'Fazer trabalho',
    tagName: 'UFRN'
  },
  {
    id: 2,
    checked: false,
    name: 'Jogar lixo fora',
    tagName: 'Casa'
  },
]

export function Todo() {
  const [todos, setTodos] = useState<Todo[]>([])

  async function addTask(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get('name'),
      tag: formData.get('tag')
    };

    console.log(data);
  }

  async function getTodos(){
    // await api
    // .get('/tasks')
    // .then((response) => setTodos(response.data))
    // .catch((error) => console.log(error))
    setTodos(data);
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div className="container">
      <Header />

      <h1>TODO LIST</h1>

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
                <button className={`done ${todo.checked ? 'checked' : ''}`}></button>
                <p className="name">{todo.name}</p>
              </div>
              <div className="half-items">
                <div className="tag">
                  <p> {todo.tagName} </p>
                </div>
                <button className="delete">
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
