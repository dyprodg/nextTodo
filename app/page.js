'use client'
import { useState } from "react";


export default function Home() {

  const [todoList, setTodoList] = useState([
    { id: 1, task: 'Einkaufen gehen', completed: false },
    { id: 2, task: 'React-App erstellen', completed: true },
    { id: 3, task: 'Übungen für JavaScript machen', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const handleTodoAdd = () => {
    if(newTodo.trim() === '') return;

    const nextId = todoList.length + 1;
    const newTodoItem = {id: nextId, task: newTodo, completed: false };
    setTodoList(prevList => [...prevList, newTodoItem]);
    setNewTodo('');
  }

  const toggleTodoCompletion = (id) => {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };


  return (
    <div className=" ">
   <div className="m-5">
        {todoList.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoCompletion(todo.id)}
            />
            {todo.task}
          </li>
        ))}
      </div>

    <input 
          className="flex border border-black bg-gray-100 m-2 ml-4 p-1 px-2 hover:shadow-md transition ease-in"
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="Neuen Todo hinzufuegen..."
        />
    <button className="m-5 p-2 px-4 border rounded-full text-white bg-black hover:shadow-md transition ease-in"
    onClick={handleTodoAdd}>
      Hinzufuegen
    </button>
    </div>
  )
}
