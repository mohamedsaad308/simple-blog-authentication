import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const API_URL = "http://localhost:8000";

export const loginUser = (cred) => {
  return fetch(`${API_URL}/api/validate-aws-credentials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cred),
  });
};

export const useRegisterUser = (userData) => {
  return axios.post(`${API_URL}/auth/users/`, userData);
};

export const useLoginUser = (userData) => {
  return axios.post(`${API_URL}/auth/jwt/create`, userData);
};

export const resendActivationEmail = (email) => {
  return axios.post(`${API_URL}/auth/users/resend_activation/`, email);
};

export const activateUser = (activationData) => {
  return axios.post(`${API_URL}/auth/users/activation/`, activationData);
};

export const forgotPassword = (email) => {
  return axios.post(`${API_URL}/auth/users/reset_password/`, email);
};

export const resetPassword = ({ uid, token, new_password, re_new_password }) => {
  return axios.post(`${API_URL}/auth/users/reset_password_confirm/`, {
    uid,
    token,
    new_password,
    re_new_password,
  });
};
