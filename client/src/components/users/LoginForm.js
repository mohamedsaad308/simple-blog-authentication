// LoginForm.js
import React, { useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post("YOUR_API_ENDPOINT/login/", formData);
      // Handle successful login, e.g., set user state or redirect
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Login failed. Please check your email and password.");
    }
  };

  return (
    <div id="login-container" className="container">
      <h2>Login</h2>
      {errorMessage && (
        <div id="login-alert" className="alert alert-danger">
          {errorMessage}
        </div>
      )}
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <hr />

      <div>
        <p>
          Not a user? <Link to="/register">Register here</Link>
        </p>
        <p>
          Forgot your password? <Link to="/forgot-password">Reset Password</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
