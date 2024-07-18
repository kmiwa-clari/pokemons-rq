import React from "react";
import { usePokemonTable } from "./providers/PokemonTableProvider";

function PokemonTableResultsPickerContext() {
  const { resultsPerPage, setResultsPerPage, setPage } = usePokemonTable();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(0);
    setResultsPerPage(parseInt(e.target.value));
  }

  return (
    <select value={resultsPerPage} onChange={onChange}>
      <option>5</option>
      <option>10</option>
      <option>25</option>
      <option>50</option>
      <option>100</option>
    </select>
  );
}

export default PokemonTableResultsPickerContext;
