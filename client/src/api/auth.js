import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const API_URL = "http://localhost:8000"

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




export const resendActivationEmail = (email) => {
  return axios.post(`${API_URL}/auth/users/resend_activation/`, email);
}

export const activateUser = (activationData) => {
  return axios.post(`${API_URL}/auth/users/resend_activation/`, activationData)
}