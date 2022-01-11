import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Test } from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="test" element={<Test />}></Route>
        <Route path="sign-up" element={<Register />}></Route>
        <Route path="sign-in" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
