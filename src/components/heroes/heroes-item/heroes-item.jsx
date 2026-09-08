import { Link } from 'react-router-dom';

function HeroesItem({ hero }) {
  const { id, name, alias, image } = hero;

  return (
    <Link to={`/heroes/${id}`} className="card h-100 text-decoration-none text-reset">
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-muted">{alias}</p>
      </div>
    </Link>
  );
}

export default HeroesItem;
