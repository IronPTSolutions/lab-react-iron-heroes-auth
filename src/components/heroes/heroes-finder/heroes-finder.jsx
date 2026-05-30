import { useSearchParams } from 'react-router-dom';

function HeroesFinder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name') ?? '';

  const handleSearchChange = (event) => {
    setSearchParams({ name: event.target.value });
  };

  return (
    <div className="input-group">
      <span className="input-group-text"><i className="fa fa-search"></i></span>
      <input
        type="text"
        value={name}
        className="form-control"
        placeholder="Buscar heroe por nombre..."
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default HeroesFinder;