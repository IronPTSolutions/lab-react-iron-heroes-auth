import { useEffect, useState } from "react";
import { PageLayout } from "../components/layouts";
import { useSearchParams } from "react-router-dom";
import * as HeroesService from "../services/heroes-service";
import HeroesFinder from "../components/heroes/heroes-finder/heroes-finder";
import HeroesList from "../components/heroes/heroes-list/heroes-list";

function HeroesPage() {
  const [heroes, setHeroes] = useState([]);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? "";

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const data = await HeroesService.listHeroes({ name });
        setHeroes(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchHeroes();
  }, [name]);
  // TODO Iteration 4 | Listado de heroes con buscador
  //
  // Esta pagina debe mostrar el listado de heroes junto a un buscador.
  //   - Guarda los heroes en el estado del componente.
  //   - El termino de busqueda debe vivir en la query string de la URL (parametro
  //     `name`), no en el estado local del componente.
  //   - Cuando cambie el termino de busqueda, pide los heroes a tu heroes-service
  //     (pasandole el `name`) y actualiza el estado.
  //   - Renderiza el buscador (HeroesFinder) y la lista (HeroesList), pasandole
  //     los heroes a la lista.

  return (
    <PageLayout
      jumbotron={{ title: "Heroes", subtitle: "Busca tu heroe favorito" }}
    >
      <HeroesFinder />
      <HeroesList heroes={heroes} />
    </PageLayout>
  );
}

export default HeroesPage;