import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HeroesFinder, HeroesList } from "../components/heroes";
import { PageLayout } from "../components/layouts";
import { listHeroes } from "../services/heroes-service";

function HeroesPage() {
  const [searchParams] = useSearchParams();
  const [heroes, setHeroes] = useState([]);
  const name = searchParams.get("name") ?? "";

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const data = await listHeroes({ name });
        setHeroes(data);
      } catch (error) {
        console.error("Error fetching heroes:", error);
      }
    };

    fetchHeroes();
  }, [name]);

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
