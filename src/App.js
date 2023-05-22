import './App.css';
import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString(undefined, dateOptions);
    setCurrentDate(formattedDate);
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputText, completed: false }]);
      setInputText('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="todo-app">
      <h1>Testing Todo App</h1>
      <div className="form-container">
        <input type="text" value={inputText} onChange={handleInputChange} placeholder="Insert Todo" />
        <button onClick={handleAddTodo}>Tambahkan</button>
      </div>
      <p className="current-date">Date: {currentDate}</p>
      <TodoList
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onToggleTodo={handleToggleTodo}
      />
    </div>
  );
};

export default App;
