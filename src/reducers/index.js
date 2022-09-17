import { combineReducers } from "redux";

import todos from "./todos";
import auth from "./auth";
export const reducers = combineReducers({ todos, auth });
