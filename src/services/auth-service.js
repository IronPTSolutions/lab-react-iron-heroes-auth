import axios from 'axios';
import { baseMockDomain } from '../mock/config';

const api = axios.create({
  baseURL: baseMockDomain,
});

export async function register(user) {
  const { data } = await api.post('/users', user);
  return data;
}

export async function login(credentials) {
  const { data } = await api.post('/login', credentials);
  return data;
}
