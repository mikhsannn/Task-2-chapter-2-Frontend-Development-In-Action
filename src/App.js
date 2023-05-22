import './App.css';
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, deleteDoc, doc, setDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import TodoList from './components/TodoList';
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString(undefined, dateOptions);
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, [db]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = async () => {
    const todo = {
      text: inputText,
      completed: false
    };
  
    try {
      await addDoc(collection(db, 'todos'), todo);
      setInputText('');
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  };
  
const handleDeleteTodo = async (id) => {
  try {
    const todoRef = doc(db, 'todos', id);
    const todo = todos.find((todo) => todo.id === id);

    if (!todo.completed) {
      console.log('Todo must be completed before deleting.');
      return;
    }

    await deleteDoc(todoRef);
  } catch (error) {
    console.error('Error deleting todo: ', error);
  }
};

  
  const handleToggleTodo = async (id) => {
    try {
      const todoRef = doc(db, 'todos', id);
      const todo = todos.find((todo) => todo.id === id);
      await updateDoc(todoRef, { completed: !todo.completed });
    } catch (error) {
      console.error('Error toggling todo: ', error);
    }
  };
  
  return (
    <div className="todo-app">
      <h1 className="logo">ReactToDo - Todo App</h1>
      <p className="current-date">Date: {currentDate}</p>
      <div className="todo-form">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Insert Todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onToggleTodo={handleToggleTodo} />
    </div>
  );
};  

export default App;
