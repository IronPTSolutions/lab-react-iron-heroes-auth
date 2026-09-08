import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function HeroesFinder() {

  const [searchParams, setSearchParams] = useSearchParams();

  const initialName = searchParams.get("name") || "";
  const [name, setName] = useState(initialName);

  const handleChange = (event) => {
    const value = event.target.value;

    setName(value);

    if (value) {
      setSearchParams({ name: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search heroes"
        value={name}
        onChange={handleChange}
      />
    </div>
  );
}

export default HeroesFinder;