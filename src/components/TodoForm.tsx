import React, { ChangeEvent, FormEvent, useState } from 'react';
import { addTodo } from '../firebase/firestore/todo';

function TodoForm() {
  const [taskName, setTaskName] = useState('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const addTodoHandler = async (todoName: string) => {
    const added = await addTodo(todoName);
    console.log(added);
    if (!added.error) {
      setTaskName('');
    }
  };

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (taskName.trim()) {
      addTodoHandler(taskName);
    }
  };
  return (
    <form className="todo-form" onSubmit={handleOnSubmit}>
      <input type="text" value={taskName} onChange={handleNameChange} />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TodoForm;
