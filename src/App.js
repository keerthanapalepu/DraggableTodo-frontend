import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const user2 = useSelector((state) => state.auth.authData);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/todos"
          exact
          element={user2 || user ? <Home /> : <Auth />}
        />
        <Route path="/" element={<Navigate to="/todos" replace={true} />} />
        <Route
          path="/auth"
          exact
          element={!user ? <Auth /> : <Navigate to="/todos" replace={true} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
