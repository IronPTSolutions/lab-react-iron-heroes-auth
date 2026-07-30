import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../components/layouts';
import { getHero } from '../services/heroes-service';

function HeroDetailPage() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    getHero(id).then(setHero);
  }, [id]);

  if (!hero) {
    return (
      <PageLayout jumbotron={{ title: 'Detalle del heroe' }}>
        <p className="text-muted">Cargando heroe...</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout jumbotron={{ title: hero.name, subtitle: hero.alias }}>
      <div className="row">
        <div className="col-md-4">
          <img src={hero.image} alt={hero.name} className="img-fluid rounded" />
        </div>
        <div className="col-md-8">
          <h2>{hero.name}</h2>
          <h5 className="text-muted">{hero.alias}</h5>
          <p><strong>Publisher:</strong> {hero.publisher}</p>
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
