import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useMeQuery } from "./generated/graphql";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useAppDispatch } from "./store/hook";
import { RemoveUserProfile, SetUserProfile } from "./store/userReducer";

function App() {
  const [{ data }] = useMeQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && data.me) {
      dispatch({ type: SetUserProfile, payload: data.me });
    } else {
      dispatch({ type: RemoveUserProfile, payload: null });
    }
  }, [data]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="sign-up" element={<Register />}></Route>
        <Route path="sign-in" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
