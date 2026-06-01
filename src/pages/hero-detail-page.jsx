import { useParams } from "react-router-dom";
import { PageLayout } from "../components/layouts";
import { useEffect, useState } from "react";
import * as HeroesService from "../services/heroes-service";
import HeroesItem from "../components/heroes/heroes-item/heroes-item";

function HeroDetailPage() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    async function fetchHero() {
      try {
        const data = await HeroesService.getHero(id);
        setHero(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchHero();
  }, [id]);

  // TODO Iteration 5 | Detalle del heroe
  //
  // Lee el id del heroe desde los parametros de la URL.
  // Pide ese heroe a tu heroes-service y guardalo en el estado del componente.
  // Mientras no haya datos, muestra un mensaje de carga.
  // Cuando tengas el heroe, muestra su nombre, alias, publisher, imagen,
  // descripcion y la lista de sus poderes.

  return (
    <PageLayout jumbotron={{ title: "Detalle del heroe" }}>
      <HeroesItem hero={hero} />
    </PageLayout>
  );
}

export default HeroDetailPage;
