import { randomUUID } from "crypto";
import { Todo } from "../types/Todo";

const todos: Todo[] = [
  { id: randomUUID(), title: "Vask bilen", completed: false },
  { id: randomUUID(), title: "Rydd huset", completed: false },
  { id: randomUUID(), title: "Gå en tur", completed: false },
  { id: randomUUID(), title: "Les en bok", completed: false },
];


const findTodoIndex = (id: string) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return;
  return index;
};

export const getTodos = () => todos;

export const getTodoById = (id: string) => todos.find(todo => todo.id === id);

export const addTodo = (title: string, completed = false) => {
  const newTodo = { id: randomUUID(), title, completed };
  todos.push(newTodo);
  return newTodo;
};

export const completeTodo = (id: string) => {
  const index = findTodoIndex(id);
  if (index === undefined) return;
  const todo = todos[index];
  const completedTodo = { ...todo, completed: true };
  todos.splice(index, 1, completedTodo);
  return completedTodo;
};

export const deleteTodo = (id: string) => {
  const index = findTodoIndex(id);
  if (index === undefined) return;
  const deletedTodo = todos[index];
  todos.splice(index, 1);
  return deletedTodo;
};
