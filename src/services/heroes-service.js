import axios from "axios";
import { baseMockDomain } from "../mock/config";

const heroesApi = axios.create({
  baseURL: baseMockDomain,
});

export const listHeroes = async ({ name } = {}) => {
  const response = await heroesApi.get("/heroes", {
    params: name ? { name } : {},
  });

  return response.data;
};

export const getHero = async (id) => {
  const response = await heroesApi.get(`/heroes/${id}`);
  return response.data;
};

export default { listHeroes, getHero };
