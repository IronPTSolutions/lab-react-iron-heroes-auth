// TODO Iteration 1 | Capa de servicios de autenticacion
//
// Esta es la capa que habla con la API simulada usando axios. La API esta
// disponible en la URL base: https://api.ironheroes.mock.org
//
// Crea una instancia de axios apuntando a esa URL base y exporta dos funciones
// asincronas:
//
//   - register(user): envia el objeto `user` con un POST al endpoint /users.
//       Devuelve los datos del usuario que responde la API.
//
//   - login(credentials): envia un objeto con username y password con un POST
//       al endpoint /login. La API responde con un objeto { user, token } que
//       debes devolver.
//
// Recuerda exportar cada operacion para poder importarlas desde los formularios.
import axios from "axios";
const http = axios.create({
    baseURL : "https://api.ironheroes.mock.org"
});

export async function register(user) {
    const response = await http.post(
        "/users",
        user

    );

    return response.data;
}
 
export async function login(credentials) {
    const response = await http.post(
        "/login",
        credentials
    );
    return response.data;
}