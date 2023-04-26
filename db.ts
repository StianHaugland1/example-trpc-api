import { Todo } from "./types/Todo";

const todos: Todo[] = [
  { id: 0, title: "Vask bilen", completed: false },
  { id: 1, title: "Rydd huset", completed: false },
  { id: 2, title: "Gå en tur", completed: false },
  { id: 3, title: "Les en bok", completed: false },
];

let nextTodoId = 4;

const findTodoIndex = (id: number) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return;
  return index;
};

export const getTodos = () => todos;

export const getTodoById = (id: number) => todos.find(todo => todo.id === id);

export const addTodo = (title: string, completed = false) => {
  const newTodo = { id: nextTodoId++, title, completed };
  todos.push(newTodo);
  return newTodo;
};

export const completeTodo = (id: number) => {
  const index = findTodoIndex(id);
  if (index === undefined) return;
  const todo = todos[index];
  const completedTodo = { ...todo, completed: true };
  todos.splice(index, 1, completedTodo);
  return completedTodo;
};

export const deleteTodo = (id: number) => {
  const index = findTodoIndex(id);
  if (index === undefined) return;
  const deletedTodo = todos[index];
  todos.splice(index, 1);
  return deletedTodo;
};
