import { Link } from 'react-router-dom';

function HeroesItem({ hero }) {
  return (
    <Link to={`/heroes/${hero.id}`} className="card text-decoration-none text-reset h-100">
      <img src={hero.image} className="card-img-top" alt={hero.name} />
      <div className="card-body">
        <h5 className="card-title">{hero.name}</h5>
        <p className="card-text text-muted">{hero.alias}</p>
      </div>
    </Link>
  );
}

export default HeroesItem;
