import React from 'react';

const TodoList = ({ todos, onDeleteTodo, onToggleTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item ${todo.completed ? 'completed' : ''}`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleTodo(todo.id)}
          />
          {todo.text}
          <button className="delete-btn" onClick={() => onDeleteTodo(todo.id)}>
            Delete Todo
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
