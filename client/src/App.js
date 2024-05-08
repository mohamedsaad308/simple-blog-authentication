// src/App.js
import { Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import LoginForm from "./components/users/LoginForm";
import RegisterForm from "./components/users/RegisterForm";
import RegisteredSuccess from "./components/users/RegisteredSuccess";
import ActivationComponent from "./components/users/ActivationComponent"

function App() {
  return (
    <Layout>
      <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<LoginForm />} exact />
          <Route path="/register" element={<RegisterForm />} exact />
          <Route path="/user-registered" element={<RegisteredSuccess />} exact />
          <Route path="/activate/:uid/:token" component={ActivationComponent} />
      </Routes>
    </Layout>
  );
}

export default App;
