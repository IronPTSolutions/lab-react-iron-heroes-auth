import { useSearchParams } from "react-router-dom";

function HeroesFinder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") ?? "";

  function handleSearch(e) {
    setSearchParams(e.target.value ? { name: e.target.value } : {});
  }

  // TODO Iteration 4 | Buscador
  //
  // Renderiza un input de texto controlado para buscar heroes por nombre.
  // El valor del buscador debe estar sincronizado con la query string de la URL
  // (parametro `name`): al escribir en el input debes actualizar ese parametro, y
  // el valor mostrado en el input debe leerse tambien desde la URL.

  return (
    <div className="input-group mb-3">
      <span className="input-group-text">
        <i className="fa fa-search fa-fw"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar heroe..."
        value={name}
        onChange={handleSearch}
      />
    </div>
  );
}

export default HeroesFinder;
