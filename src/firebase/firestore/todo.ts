// import { tasksCollection } from '..';
import { getUserDocument } from './user';
import { firestore } from 'firebase';

let tasksCollection: firestore.CollectionReference;

const getTodosCollection = (uid: string) => {
  const userDoc = getUserDocument(uid);
  tasksCollection = userDoc.collection('tasks');
  return tasksCollection.orderBy('isComplete', 'asc').orderBy('ts', 'asc');
};

const addTodo = async (todoName: string) => {
  try {
    const added = await tasksCollection.add({
      name: todoName,
      ts: new Date().getTime(),
      isComplete: false
    });
    return { error: false, added };
  } catch (error) {
    return { error: true };
  }
};

const deleteTodo = (id: string) => {
  tasksCollection
    .doc(id)
    .delete()
    .then(() => console.log('Deleted'));
};

const updateTodo = (id: string, status: boolean) => {
  tasksCollection
    .doc(id)
    .update({ isComplete: !status })
    .then(() => console.log('Status Changed'));
};

export { getTodosCollection, addTodo, deleteTodo, updateTodo };
