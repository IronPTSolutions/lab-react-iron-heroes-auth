import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../components/layouts';
import * as HeroesService from '../services/heroes-service';

function HeroDetailPage() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    async function fetchHero() {
      try {
        const hero = await HeroesService.getHero(id);
        setHero(hero);
      } catch (error) {
        console.error(error);
      }
    }
    fetchHero();
  }, [id]);

  if (!hero) {
    return (
      <PageLayout>
        <p>Cargando...</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout jumbotron={{ title: hero.name, subtitle: hero.alias }}>
      <div className="row">
        <div className="col-md-4">
          <img src={hero.image} className="img-fluid rounded" alt={hero.name} />
        </div>
        <div className="col-md-8">
          <p className="text-muted">{hero.publisher}</p>
          <p>{hero.description}</p>
          <h5>Poderes</h5>
          <ul>
            {hero.powers.map((power) => (
              <li key={power}>{power}</li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}

export default HeroDetailPage;