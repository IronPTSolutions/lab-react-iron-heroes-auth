import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/layouts";
import { getHero } from "../services/heroes-service";

function HeroDetailPage() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getHero(id);
        setHero(data);
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    };

    fetchHero();
  }, [id]);

  if (!hero) {
    return (
      <PageLayout jumbotron={{ title: "Detalle del heroe" }}>
        <p className="text-muted">Cargando...</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout jumbotron={{ title: hero.name }}>
      <div className="row g-4 align-items-center">
        <div className="col-md-4">
          <img
            src={hero.image}
            alt={hero.name}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-8">
          <h2>{hero.name}</h2>
          <p className="fs-5 text-muted">Alias: {hero.alias}</p>
          <p>
            <strong>Publisher:</strong> {hero.publisher}
          </p>
          <p>{hero.description}</p>

          <h4>Poderes</h4>
          <ul className="list-group list-group-flush">
            {hero.powers.map((power) => (
              <li key={power} className="list-group-item">
                {power}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}

export default HeroDetailPage;
