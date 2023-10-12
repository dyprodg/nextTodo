
'use client'
import { useState, useEffect } from "react";

export default function Home() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('/api/getTodos');
      const data = await response.json();
      setTodoList(data);
    };
    fetchTodos();
  }, []);

  const handleTodoAdd = async () => {
    if (newTodo.trim() === '') return;

    const nextId = todoList.length + 1;
    const newTodoItem = { id: nextId, task: newTodo, completed: false };

    const response = await fetch('/api/addTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodoItem),
    });
    
    if (response.ok) {
      setTodoList((prevList) => [...prevList, newTodoItem]);
      setNewTodo('');
    } else {
      console.error('Failed to add todo');
    }
  };

  const toggleTodoCompletion = (id) => {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    // Optional: Sie können hier auch eine Update-API implementieren, um Änderungen zu speichern
  };

  return (
    <div className="">
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
      <button 
        className="m-5 p-2 px-4 border rounded-full text-white bg-black hover:shadow-md transition ease-in"
        onClick={handleTodoAdd}
      >
        Hinzufuegen
      </button>
    </div>
  );
}
