import { Link } from "react-router-dom";

function HeroesItem({ hero }) {

  return (
    <Link to={`/heroes/${hero.id}`} className="text-decoration-none">
      <div className="card h-100">
        <img
          src={hero.image}
          className="card-img-top"
          alt={hero.name}
        />

        <div className="card-body">
          <h5 className="card-title">{hero.name}</h5>
          <p className="card-text">{hero.alias}</p>
        </div>
      </div>
    </Link>
  );
}

export default HeroesItem;
