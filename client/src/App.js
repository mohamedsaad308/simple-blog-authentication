// src/App.js
import { Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import LoginForm from "./components/users/LoginForm";
import RegisterForm from "./components/users/RegisterForm";
import RegisteredSuccess from "./components/users/RegisteredSuccess";
import ActivationFailure from "./components/users/ActivationFailure";
import ActivationComponent from "./components/users/ActivationComponent";
import ForgotPasswordForm from "./components/users/ForgotPasswordForm";
import ResetPasswordForm from "./components/users/ResetPassword";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<LoginForm />} exact />
        <Route path="/register" element={<RegisterForm />} exact />
        <Route path="/user-registered" element={<RegisteredSuccess />} exact />
        <Route path="/activation-failed" element={<ActivationFailure />} exact />
        <Route path="/activate/:uid/:token" element={<ActivationComponent />} exact />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} exact />
        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordForm />} exact />
      </Routes>
    </Layout>
  );
}

export default App;
