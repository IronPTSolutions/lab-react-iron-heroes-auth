import HeroesItem from "../heroes-item/heroes-item";

function HeroesList({ heroes = [] }) {
  return (
    <div className="row g-4">
      {heroes.map((hero) => (
        <div className="col-md-6 col-lg-4" key={hero.id}>
          <HeroesItem hero={hero} />
        </div>
      ))}
    </div>
  );
}

export default HeroesList;
