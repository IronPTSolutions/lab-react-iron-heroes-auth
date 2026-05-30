import { http, HttpResponse } from 'msw';
import { baseMockDomain } from './config';

const LS_USERS_KEY = 'users';
const users = self.localStorage.getItem(LS_USERS_KEY)
  ? JSON.parse(self.localStorage.getItem(LS_USERS_KEY))
  : [];

// POST /users -> register a new user
export const handleUserRegister = http.post(`${baseMockDomain}/users`, async ({ request }) => {
  const user = await request.json();
  console.log('mock user register received', user);

  const isAlreadyRegistered = users.some(
    (registeredUser) => registeredUser.username === user.username || registeredUser.email === user.email
  );

  if (isAlreadyRegistered) {
    return HttpResponse.json(
      {
        message: 'Invalid user register',
        errors: {
          username: 'Username or email already registered'
        }
      },
      { status: 400 }
    );
  }

  user.id = self.crypto.randomUUID();
  users.push(user);
  self.localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));

  const safeUser = { ...user };
  delete safeUser.password;
  return HttpResponse.json(safeUser, { status: 201 });
});

// POST /login -> validate credentials, return { user, token }
export const handleLogin = http.post(`${baseMockDomain}/login`, async ({ request }) => {
  const { username, password } = await request.json();

  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!foundUser) {
    return HttpResponse.json(
      {
        message: 'Invalid credentials',
        errors: {
          username: 'Usuario o contrasena incorrectos'
        }
      },
      { status: 401 }
    );
  }

  const safeUser = { ...foundUser };
  delete safeUser.password;
  const token = self.crypto.randomUUID();
  return HttpResponse.json({ user: safeUser, token }, { status: 200 });
});
