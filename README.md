![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# LAB | React Iron Heroes Auth

:::info

  :computer: **Activity Type:** Individual

:::

<br>

## Introduccion

En este lab vas a construir una pequena aplicacion de React llamada **Iron Heroes**: un
catalogo de superheroes con registro y login simulados. No necesitas backend real: usamos
**MSW (Mock Service Worker)** para interceptar las peticiones HTTP y responder con datos
falsos guardados en `localStorage`.

Al terminar este lab seras capaz de:

- Crear una **capa de servicios** con **axios** para consumir una API.
- Construir formularios con **react-hook-form** (validacion y errores de servidor).
- Navegar entre paginas con **react-router-dom** (`Routes`, `Link`, `useNavigate`,
  `useParams`, `useSearchParams`).
- Separar componentes en presentacionales (list/item) y contenedores (pages).

## Requirements

- Haz **fork** de este repositorio.
- **Clona** tu fork:

  ```bash
  git clone https://github.com/IronPTSolutions/lab-react-iron-heroes-auth.git
  ```

- Instala las dependencias:

  ```bash
  npm install
  ```

- El service worker de MSW ya viene incluido (`public/mockServiceWorker.js`). Si al arrancar
  ves un aviso de version desactualizada, vuelve a generarlo:

  ```bash
  npx msw init public/
  ```

- Arranca la app:

  ```bash
  npm run dev
  ```

## Submission

- Cuando termines, ejecuta:

  ```bash
  git add .
  git commit -m "done"
  git push origin main
  ```

- Crea un **Pull Request** para que tus TAs puedan revisar tu trabajo.
- Nombra el PR asi (individual): `MIA-PTWD-tunombre-react-iron-heroes-auth`.

## Starter code

El starter ya incluye, listo para usar y **que NO debes tocar**:

- `src/mock/` -> la **API simulada** con MSW. Esta dividida en:
  - `heroes.json` -> los datos de los 10 heroes.
  - `auth-controller.js` -> los handlers de registro y login.
  - `heroes-controller.js` -> los handlers del listado y el detalle.
  - `index.js` -> registra los handlers en el worker de MSW.
- `src/main.jsx`, `src/App.jsx` y las rutas.
- El layout, la navbar y el jumbotron.

Tu trabajo es completar los ficheros marcados con `// TODO`: la capa de servicios,
los formularios y las paginas/componentes de heroes.

## La API simulada (mock)

No necesitas tocar el mock, pero **si necesitas conocer su contrato** para escribir
la capa de servicios. Todas las peticiones van a la URL base:

```
https://api.ironheroes.mock.org
```

| Metodo | Endpoint        | Body                                      | Respuesta OK                          | Errores |
| ------ | --------------- | ----------------------------------------- | ------------------------------------- | ------- |
| POST   | `/users`        | `{ name, email, username, password }`     | `201` con el usuario creado (sin password) | `400` `{ message, errors: { username } }` si el username o el email ya existen |
| POST   | `/login`        | `{ username, password }`                  | `200` con `{ user, token }`           | `401` `{ message, errors: { username } }` si las credenciales son incorrectas |
| GET    | `/heroes`       | -                                         | `200` con el array de heroes          | - |
| GET    | `/heroes?name=` | (query param `name`)                      | `200` con los heroes cuyo nombre o alias contiene `name` | - |
| GET    | `/heroes/:id`   | -                                         | `200` con el heroe                    | `404` `{ message }` si no existe |

Cada heroe tiene esta forma:

```json
{
  "id": "1",
  "name": "Superman",
  "alias": "Clark Kent",
  "publisher": "DC Comics",
  "image": "https://.../644-superman.jpg",
  "powers": ["Super fuerza", "Vuelo", "..."],
  "description": "El ultimo hijo de Krypton..."
}
```

> Los usuarios registrados se guardan en el `localStorage` del navegador, asi que
> persisten entre recargas. Si quieres empezar de cero, borra la clave `users` del
> localStorage.

## Iterations

### Iteration 1 | Capa de servicios

Completa `src/services/auth-service.js` y `src/services/heroes-service.js`.

Crea una instancia de axios apuntando a la URL base de la API simulada y exporta una
funcion por operacion:

- `auth-service.js`: `register(user)` (POST `/users`) y `login(credentials)`
  (POST `/login`, devuelve `{ user, token }`).
- `heroes-service.js`: `listHeroes({ name })` (GET `/heroes`, enviando `name` como
  query param si existe) y `getHero(id)` (GET `/heroes/:id`).

Consulta la tabla de **La API simulada (mock)** para conocer el contrato de cada endpoint.

### Iteration 2 | Registro

Completa `src/components/auth/register-form/register-form.jsx`:

- Formulario controlado con **react-hook-form** y los campos obligatorios `name`,
  `email`, `username`, `password`.
- Al enviar, usa la funcion `register` de tu auth-service.
- Si el registro va bien, redirige a la pagina de login.
- Si el servidor responde con un 400, muestra junto a cada campo el mensaje de error
  que llega del servidor.

### Iteration 3 | Login

Completa `src/components/auth/login-form/login-form.jsx`:

- Formulario controlado con los campos `username` y `password`.
- Al enviar, usa la funcion `login` de tu auth-service, que devuelve `{ user, token }`.
- Guarda el `token` y el `user` en `localStorage` y redirige al listado de heroes.
- Si el servidor responde con un 401, muestra el error de credenciales.

> Recuerda: para hacer login primero tienes que haberte registrado en la Iteration 2.

### Iteration 4 | Listado de heroes con buscador

Completa `src/pages/heroes-page.jsx` y los componentes de `src/components/heroes/`:

- `heroes-page.jsx`: guarda los heroes en el estado, lee el termino de busqueda desde
  la query string de la URL (parametro `name`) y pide los heroes a tu heroes-service
  cada vez que cambie.
- `heroes-finder.jsx`: input de busqueda controlado, sincronizado con el parametro
  `name` de la URL.
- `heroes-list.jsx`: recorre los heroes y renderiza un `HeroesItem` por cada uno.
- `heroes-item.jsx`: tarjeta con imagen, nombre y alias, enlazada al detalle del heroe.

### Iteration 5 | Detalle del heroe

Completa `src/pages/hero-detail-page.jsx`:

- Lee el `id` de la URL.
- Pide el heroe a tu heroes-service.
- Muestra nombre, alias, publisher, imagen, descripcion y la lista de poderes.

### Iteration 6 | Bonus

Elige uno o varios:

- **Rutas protegidas**: crea un componente `PrivateRoute` que, si no hay `token` en
  `localStorage`, redirija a `/login` (usa `<Navigate to="/login" />`). Protege `/heroes`
  y `/heroes/:id`.
- **Logout**: anade un boton en la navbar que borre `token` y `user` de `localStorage` y
  redirija a `/login`.
- **Persistir sesion en la navbar**: muestra "Login/Register" o el nombre del usuario y
  "Logout" segun si hay sesion activa.

Happy coding! :heart:
