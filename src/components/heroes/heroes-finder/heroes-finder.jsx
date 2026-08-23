import { useSearchParams } from "react-router-dom";

function HeroesFinder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentName = searchParams.get("name") ?? "";

  const handleChange = (event) => {
    const value = event.target.value;
    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set("name", value);
    } else {
      nextParams.delete("name");
    }

    setSearchParams(nextParams);
  };

  return (
    <div className="mb-4">
      <label htmlFor="hero-search" className="form-label">
        Busca por nombre o alias
      </label>
      <input
        id="hero-search"
        type="text"
        value={currentName}
        onChange={handleChange}
        className="form-control"
        placeholder="Ej. Superman, Batman..."
      />
    </div>
  );
}

export default HeroesFinder;
