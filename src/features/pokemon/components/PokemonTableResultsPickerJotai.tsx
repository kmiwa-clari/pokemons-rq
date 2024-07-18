import React from "react";
import { usePageIndex, useResultsPerPage } from "../atoms/pokemon";

function PokemonTableResultsPicker() {
  const [resultsPerPage, setResultsPerPage] = useResultsPerPage();
  const [, setPage] = usePageIndex();

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

export default PokemonTableResultsPicker;
