import { setupWorker } from 'msw/browser';
import { handleUserRegister, handleLogin } from './auth-controller';
import { handleListHeroes, handleGetHero } from './heroes-controller';

const worker = setupWorker(
  handleUserRegister,
  handleLogin,
  handleListHeroes,
  handleGetHero,
);

export default worker;
