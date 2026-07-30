import { useSearchParams } from 'react-router-dom';

function HeroesFinder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name') ?? '';

  const handleChange = (event) => {
    const value = event.target.value;
    if (value) {
      setSearchParams({ name: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Busca un heroe por nombre o alias..."
        value={name}
        onChange={handleChange}
      />
    </div>
  );
}

export default HeroesFinder;
