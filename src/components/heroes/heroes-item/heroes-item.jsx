import { Link } from "react-router-dom";

function HeroesItem({ hero: { id, name, alias, image } }) {
  return (
    <Link to={`/heroes/${id}`} className="text-decoration-none">
      <div className="card text-bg-dark" style={{ width: '12rem' }}>
        <img src={image} className="card-img" alt={name} style={{ height: '16rem', objectFit: 'cover' }} />
        <div className="card-img-overlay d-flex flex-column justify-content-end">
          <h6 className="card-title m-0">{name}</h6>
          <small>{alias}</small>
        </div>
      </div>
    </Link>
  );
}

export default HeroesItem;
