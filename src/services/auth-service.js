import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.ironheroes.mock.org'
});

export const register = (user) => {
  return api.post('/users', user).then((response) => response.data);
};

export const login = (credentials) => {
  return api.post('/login', credentials).then((response) => response.data);
};
