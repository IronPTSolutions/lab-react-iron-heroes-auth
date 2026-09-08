import HeroesItem from "../heroes-item/heroes-item";

function HeroesList({ heroes = [] }) {

  return (
    <div className="row">
      {heroes.map((hero) => (
        <div
          key={hero.id}
          className="col-md-4 mb-4"
        >
          <HeroesItem hero={hero} />
        </div>
      ))}
    </div>
  );
}

export default HeroesList;