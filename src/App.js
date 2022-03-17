import "./App.scss";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import NavBar from "./comps/NavBar";
import Users from "./pages/Users";
import { UserContext } from "./context/Context";
function App() {
  const { logged } = React.useContext(UserContext);
  console.log(logged);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/users"
          element={logged ? <Users /> : <Navigate to="/signin" />}
        />
        <Route
          path="/"
          element={logged ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signup"
          element={logged ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/signin"
          element={logged ? <Navigate to="/" /> : <Signin />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
