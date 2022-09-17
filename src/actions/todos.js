import { FETCH_ALL, CREATE, DELETE } from "../constants/actionTypes";

import * as api from "../api";
//Action Creators
export const getTodos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchtodos();
    dispatch({ type: FETCH_ALL, payload: data });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createTodos = (post) => async (dispatch) => {
  try {
    const { data } = await api.createTodo(post);
    dispatch({ type: CREATE, payload: data });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTodos = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateTodo(id, post);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTodos = (id, status) => async (dispatch) => {
  try {
    const { data } = await api.deleteTodo(id);
    dispatch({ type: DELETE, payload: { id, status } });
  } catch (error) {
    console.log(error.message);
  }
};
