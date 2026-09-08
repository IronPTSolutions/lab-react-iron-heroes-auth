import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../components/layouts';
import { getHero } from '../services/heroes-service';

function HeroDetailPage() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    getHero(id)
      .then(setHero)
      .catch((error) => console.error(error));
  }, [id]);

  if (!hero) {
    return (
      <PageLayout jumbotron={{ title: 'Detalle del heroe' }}>
        <p className="text-muted">Cargando...</p>
      </PageLayout>
    );
  }

  const { name, alias, publisher, image, description, powers } = hero;

  return (
    <PageLayout jumbotron={{ title: name, subtitle: alias }}>
      <div className="row">
        <div className="col-md-4">
          <img src={image} alt={name} className="img-fluid rounded" />
        </div>
        <div className="col-md-8">
          <p className="text-muted">{publisher}</p>
          <p>{description}</p>
          <h5>Poderes</h5>
          <ul>
            {powers.map((power) => (
              <li key={power}>{power}</li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}

export default HeroDetailPage;
