import { Link } from "react-router-dom";

function HeroesItem({ hero }) {
  return (
    <Link to={`/heroes/${hero.id}`} className="text-decoration-none text-reset">
      <div className="card h-100 shadow-sm border-0">
        <img
          src={hero.image}
          alt={hero.name}
          className="card-img-top"
          style={{ height: "250px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{hero.name}</h5>
          <p className="card-text text-muted mb-0">{hero.alias}</p>
        </div>
      </div>
    </Link>
  );
}

export default HeroesItem;
