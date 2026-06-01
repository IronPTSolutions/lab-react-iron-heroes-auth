import axios from "axios"


const http = axios.create({
  baseURL: "https://api.ironheroes.mock.org",
});


export async function listHeroes({ name }) {
  const params = {};
  if (name) {
    params.name = name;
  }
  const { data } = await http.get("/heroes", { params });
  return data;
}

export async function getHero(id) {
  const { data } = await http.get(`/heroes/${id}`);
  return data;
}
// TODO Iteration 1 | Capa de servicios de heroes
//
// Esta capa habla con la API simulada usando axios. La API esta disponible en
// la URL base: https://api.ironheroes.mock.org
//
// Crea una instancia de axios apuntando a esa URL base y exporta dos funciones
// asincronas:
//
//   - listHeroes({ name }): hace un GET al endpoint /heroes. Si recibe un `name`,
//       debe enviarlo como query param para filtrar la busqueda (la API filtra
//       por nombre o alias). Devuelve el array de heroes que responde la API.
//
//   - getHero(id): hace un GET al endpoint /heroes/:id y devuelve el heroe.
//
// Recuerda exportar cada operacion para poder importarlas desde las paginas.
