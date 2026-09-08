import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.ironheroes.mock.org'
});

export const listHeroes = ({ name } = {}) => {
  const params = name ? { name } : undefined;
  return api.get('/heroes', { params }).then((response) => response.data);
};

export const getHero = (id) => {
  return api.get(`/heroes/${id}`).then((response) => response.data);
};
