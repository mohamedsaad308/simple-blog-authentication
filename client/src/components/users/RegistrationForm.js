// RegistrationForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../api";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    re_password: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();

    if (formData.password !== formData.re_password) {
      setPasswordMatchError("Passwords do not match.");
      return;
    }


      registerUser(formData)
        .then(function (response) {
                  console.log(formData);
                  setSuccessMessage("Registration successful. Please check your email to activate your account.");
                  setErrorMessage(null);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
                setErrorMessage("Registration failed. Please check your input and try again.");
                setSuccessMessage(null);
        });
   
  };

  return (
    <div id="registration-container" className="container">
      <h2>Register</h2>
      {successMessage && (
        <div id="registration-alert" className="alert alert-success">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div id="registration-alert" className="alert alert-danger">
          {errorMessage}
        </div>
      )}
      {passwordMatchError && (
        <div id="registration-alert" className="alert alert-danger">
          {passwordMatchError}
        </div>
      )}
      <form id="registration-form" onSubmit={handleSubmit}>
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
        <div className="mb-3">
          <label htmlFor="re_password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className={`form-control ${passwordMatchError ? "is-invalid" : ""}`}
            id="re_password"
            name="re_password"
            value={formData.re_password}
            onChange={handleChange}
            required
          />
          {passwordMatchError && <div className="invalid-feedback">{passwordMatchError}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      <hr />

      <div>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
