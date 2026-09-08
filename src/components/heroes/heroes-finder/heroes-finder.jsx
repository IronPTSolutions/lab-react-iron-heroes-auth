import { useSearchParams } from 'react-router-dom';

function HeroesFinder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name') ?? '';

  const handleChange = (event) => {
    const value = event.target.value;

    setSearchParams((prevParams) => {
      const nextParams = new URLSearchParams(prevParams);

      if (value) {
        nextParams.set('name', value);
      } else {
        nextParams.delete('name');
      }

      return nextParams;
    });
  };

  return (
    <div className="mb-3">
      <label htmlFor="heroes-finder" className="form-label">Buscar heroe</label>
      <input
        id="heroes-finder"
        type="text"
        className="form-control"
        placeholder="Busca por nombre..."
        value={name}
        onChange={handleChange}
      />
    </div>
  );
}

export default HeroesFinder;
