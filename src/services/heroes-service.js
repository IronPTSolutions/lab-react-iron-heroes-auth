import axios from "axios";

const http = axios.create({
  baseURL: 'https://api.ironheroes.mock.org'
});

export async function listHeroes({ name } = {}) {
  const params = {};
  if (name) {
    params.name = name;
  }
  const { data } = await http.get('/heroes', { params });
  return data;
}

export async function getHero(id) {
  const { data } = await http.get(`/heroes/${id}`);
  return data;
}
