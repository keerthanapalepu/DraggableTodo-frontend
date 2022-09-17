import { FETCH_ALL, CREATE, DELETE } from "../constants/actionTypes";

const todoReducer = (todos = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      todos[action.payload.status].push(action.payload);
      const temp = todos;
      return temp;
    case DELETE:
      const status = action.payload.status;
      return todos[status].filter((todo) => todo._id !== action.payload.id);

    default:
      return todos;
  }
};
export default todoReducer;
