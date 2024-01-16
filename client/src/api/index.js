import axios from "axios";
const API_URL =
  process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000" : "https://mohamedsaad308.pythonanywhere.com";

const config = {
  headers: {
    "Content-Type": "application/json"
  },
};
export const loginUser = (cred) => {
  return fetch(`${API_URL}/api/validate-aws-credentials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cred),
  });
};

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/auth/users/`, userData, config);
};
