import axios from "axios";

const http = axios.create({
  baseURL: 'https://api.ironheroes.mock.org'
});

export async function register(user) {
  const { data } = await http.post('/users', user);
  return data;
}

export async function login(credentials) {
  const { data } = await http.post('/login', credentials);
  return data; // { user, token }
}
