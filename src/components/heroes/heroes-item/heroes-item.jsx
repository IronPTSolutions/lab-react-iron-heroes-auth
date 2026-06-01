import { Link } from "react-router-dom";

function HeroesItem({ hero }) {
  // TODO Iteration 4 | Tarjeta de heroe
  //
  // Recibe un heroe por props y muestralo en una tarjeta (card) de Bootstrap con
  // su imagen, su nombre y su alias. La tarjeta entera debe ser un enlace que lleve
  // a la pagina de detalle de ese heroe (ruta /heroes/:id).
  if (!hero) return null;
  return (
    <Link to={`/heroes/${hero.id}`}>
      <div className={hero.name} style={{ width: "18rem" }}>
        <img src={hero.image} className="card-img-top" alt={hero.name} />
        <div className="card-body">
          <h3 className="card-title">
            Nombre:{hero.name} Alias:{hero.alias}{" "}
          </h3>
          <h5>POWERS:</h5>
          <ul>
            {hero.powers.map((power, i) => (
              <li key={i}>{power}</li>
            ))}{" "}
          </ul>
          <h5>Publisher: {hero.publisher} </h5>
          <p className="card-text">{hero.description} </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </Link>
  );
}

export default HeroesItem;
