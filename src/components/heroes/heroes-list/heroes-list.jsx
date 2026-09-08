import HeroesItem from '../heroes-item/heroes-item';

function HeroesList({ heroes = [] }) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      {heroes.map((hero) => (
        <div className="col" key={hero.id}>
          <HeroesItem hero={hero} />
        </div>
      ))}
    </div>
  );
}

export default HeroesList;
