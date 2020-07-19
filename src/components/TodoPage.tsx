import React, { useState, useEffect, useContext } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { getTodosCollection } from '../firebase/firestore/todo';
import User from './User';
import { UserContext } from '../App';

interface Todo {
  id: string;
  name: string;
  isComplete: boolean;
  ts: string;
}

function TodoPage() {
  const userContext = useContext(UserContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const getTodos = () => {
      const { uid } = userContext;
      console.log(uid);
      return getTodosCollection(uid).onSnapshot((snapshot) => {
        const todos: Todo[] = snapshot.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id
        }));
        console.log(todos);

        setTodos(todos);
      });
    };
    const unsubscribe = getTodos();
    return () => {
      unsubscribe();
    };
  }, [userContext]);

  return (
    <>
      <TodoForm />
      <User />
      <div className="tasks-pane">
        <ul className="tasks">
          {todos.map((todo: Todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoPage;
