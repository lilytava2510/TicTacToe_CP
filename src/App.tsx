import React from "react";
// import './App.css';
import { HomePage } from "./Views/HomePage/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Messenger } from "./client/client";
import { Board } from "./Components/Board/Board";
import { Local } from "./Components/Board/Local";
import { Register } from "./Components/Register/register";
import { LoginForm } from "./Components/Login/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/multi" element={<Messenger />} />
        <Route path="/single" element={<Board />} />
        <Route path="/local" element={<Local />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
