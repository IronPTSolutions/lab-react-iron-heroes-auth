import HeroesItem from "../heroes-item/heroes-item";

function HeroesList({ heroes = [] }) {
  // TODO Iteration 4 | Lista de heroes
  //
  // Recibe por props un array de heroes y renderiza un componente HeroesItem por
  // cada uno (acuerdate de la prop `key`). Colocalos en un contenedor que los
  // muestre como una rejilla o lista de tarjetas.

  return (
    <div className="row row-cols-2 row-cols-md-4 g-3">
      {heroes.map((hero) => (
        <div className="col" key={hero.id}>
          <HeroesItem hero={hero} />
        </div>
      ))}
    </div>
  );
}

export default HeroesList;
