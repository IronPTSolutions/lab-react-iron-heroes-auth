import axios from 'axios';
import { baseMockDomain } from '../mock/config';

const api = axios.create({
  baseURL: baseMockDomain,
});

export async function listHeroes({ name } = {}) {
  const { data } = await api.get('/heroes', {
    params: name ? { name } : undefined,
  });
  return data;
}

export async function getHero(id) {
  const { data } = await api.get(`/heroes/${id}`);
  return data;
}
