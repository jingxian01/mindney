import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Test } from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="test" element={<Test />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
