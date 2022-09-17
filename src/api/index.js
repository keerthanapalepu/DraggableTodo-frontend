import axios from "axios";

const API = axios.create({ baseURL: "https://amikusbackend.herokuapp.com/" });

export const signIn = (formData) => API.post("/user/login", formData);
export const signUp = (formData) => API.post("/user/register", formData);
export const fetchtodos = () => API.get("/todo");
export const updateTodo = (id, updatedPost) =>
    API.put(`/todo/${id}`, updatedPost);
export const createTodo = (newPost) => API.post("/todo", newPost);
export const deleteTodo = (id) => API.delete(`/todo/${id}`);