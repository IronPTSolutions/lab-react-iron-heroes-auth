import axios from "axios";
import { baseMockDomain } from "../mock/config";

const authApi = axios.create({
  baseURL: baseMockDomain,
});

export const register = async (user) => {
  const response = await authApi.post("/users", user);
  return response.data;
};

export const login = async (credentials) => {
  const response = await authApi.post("/login", credentials);
  return response.data;
};

export default { register, login };
