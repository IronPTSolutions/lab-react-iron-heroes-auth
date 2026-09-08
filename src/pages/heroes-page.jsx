import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HeroesFinder from "../components/heroes/heroes-finder/heroes-finder";
import HeroesList from "../components/heroes/heroes-list/heroes-list";
import { listHeroes } from "../services/heroes-service";

function HeroesPage() {
  // TODO Iteration 4 | Pagina de heroes
  //
  // Guarda los heroes en el estado, lee el termino de busqueda desde la query
  // string de la URL (parametro `name`) y pide los heroes al servicio cada vez
  // que cambie.

  const [heroes, setHeroes] = useState([]);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const data = await listHeroes({ name });
        setHeroes(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHeroes();
  }, [name]);

  return (
    <div>
      <HeroesFinder />
      <HeroesList heroes={heroes} />
    </div>
  );
}

export default HeroesPage;
