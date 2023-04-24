import { getJwtSecret } from "./environment/environment";
import { Todo } from "./types/Todo";
import { User } from "./types/User";
import jwt from "jsonwebtoken";

export const jwtSecret = getJwtSecret();

const users: User[] = [
  { username: "admin", password: "admin" },
  { username: "user", password: "user" },
];

const todos: Todo[] = [
  { id: 0, title: "Vask bilen", completed: false },
  { id: 1, title: "Rydd huset", completed: false },
  { id: 2, title: "Gå en tur", completed: false },
  { id: 3, title: "Les en bok", completed: false },
];

let nextTodoId = 4;

export const getToken = (username: string, password: string) => {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) return;
  const token = jwt.sign({ name: user.username }, jwtSecret, {
    expiresIn: "1m",
  });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    return decodedToken;
  } catch (error) {
    console.error(error);
  }
};

const findTodoIndex = (id: number) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return;
  return index;
};

export const getTodos = () => todos;

export const getTodoById = (id: number) => todos.find((todo) => todo.id === id);

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
