import axios from "axios";

export const createAdmin = async (email, password) => {
  return await axios.post(`${"http://localhost:4000/api"}/create-admin`, {
    email,
    password,
  });
};

export const loginAdmin = async (email, password) => {
  return await axios.post("http://localhost:4000/api/login-admin", {
    email,
    password,
  });
};

export const mailForChangePassword = async (email, subject, text) => {
  return await axios.post("http://localhost:4000/api/send-email", {
    email,
    subject,
    text,
  });
};

export const currentAdmin = async (adminToken) => {
  return await axios.get("http://localhost:4000/api/current-admin", {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};
