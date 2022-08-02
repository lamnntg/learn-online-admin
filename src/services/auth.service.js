import axios from "axios";
import { API_URL, ROLE_MODERATOR } from "../utils/constants";

const login = (username, password) => {
  return axios
    .post(API_URL + "admin/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = (name, username, email, password) => {
  return axios.post(API_URL + "signup", {
    name,
    username,
    email,
    password,
  });
};

const getCurrentUser = () => {
  // return {
  //   accessToken:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODk0NzUwODVkYmE4YzZhMDA5NmQ5OCIsImlhdCI6MTY1NjIzODUxNiwiZXhwIjoxNjU2MzI0OTE2fQ.fgwH_WGHvuzNOzZ-pVQFn5ux2Dgj0r9S-wC6MCBzxjo",
  //   address: "Le Thanh Nghi",
  //   avatar_url: "https://i.ibb.co/0CqfZWV/214542bcd1e2.jpg",
  //   description: "Mô tả về bản thân",
  //   email: "lam2323.hust@gmail.com",
  //   id: "6189475085dba8c6a0096d98",
  //   name: "Nguyễn Tùng Lâm",
  //   roles: ["ROLE_USER", "ROLE_MODERATOR"],
  //   status: "pending",
  //   username: "lam123456",
  // };
  return JSON.parse(localStorage.getItem("user"));
};

const checkModerator = () => {
  return JSON.parse(localStorage.getItem("user")).roles.includes(
    ROLE_MODERATOR
  );
};

const updateCurrentUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({ ...getCurrentUser(), ...data })
  );
};

export const authService = {
  login,
  logout,
  register,
  getCurrentUser,
  checkModerator,
  updateCurrentUser,
};
