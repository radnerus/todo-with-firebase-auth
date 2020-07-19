import React from 'react';
import FormattedDate from './FormattedDate';
import { updateTodo, deleteTodo } from '../firebase/firestore/todo';

interface Todo {
  id: string;
  isComplete: boolean;
  name: string;
  ts: string;
}

interface TodoProp {
  todo: Todo;
}

function TodoItem({ todo: { id, isComplete, name, ts } }: TodoProp) {
  return (
    <li>
      <span
        onClick={() => updateTodo(id, isComplete)}
        className={isComplete ? 'todo strike' : 'todo'}
      >
        {name}
        <br />
        {<FormattedDate timestamp={ts} />}
      </span>{' '}
      <button onClick={() => deleteTodo(id)}>Delete</button>{' '}
    </li>
  );
}

export default TodoItem;
