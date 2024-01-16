// src/App.js
import { Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import LoginForm from "./components/users/LoginForm";
import RegistrationForm from "./components/users/RegistrationForm";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<LoginForm />} exact />
        <Route path="/register" element={<RegistrationForm />} exact />
      </Routes>
    </Layout>
  );
}

export default App;
