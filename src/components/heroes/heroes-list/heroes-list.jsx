import HeroesItem from "../heroes-item/heroes-item";

function HeroesList({ heroes = [], className = '' }) {
  return (
    <div className={`d-flex flex-wrap gap-2 mt-2 ${className}`}>
      {heroes.map((hero) => (
        <HeroesItem key={hero.id} hero={hero} />
      ))}
    </div>
  );
}

export default HeroesList;