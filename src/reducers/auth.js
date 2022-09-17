import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (credentials = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...credentials, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...credentials, authData: null };
    default:
      return credentials;
  }
};

export default authReducer;
