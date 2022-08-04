import axios from "axios";
import authHeader from "./auth-header";
import { API_URL, API_ROOT } from "../utils/constants";

const getAll = () => {
  return axios.get(`${API_ROOT}/admin/course/all`, {
    headers: authHeader(),
  });
}

const create = (course) => {
  return axios.post(`${API_ROOT}/admin/course/create`, course, {
    headers: authHeader(),
  })
}

export const courseService = {
  getAll,
  create
};
