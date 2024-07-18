import React, { useState } from "react";
import usePokemons from "../hooks/usePokemons";
import PokemonTableResultsPickerContext from "./PokemonTableResultsPickerContext";
import Loader from "../../../shared/components/Loader";
import { usePokemonTable } from "./providers/PokemonTableProvider";

function PokemonTableContext() {
  const { page, setPage, resultsPerPage } = usePokemonTable();
  const [enablePrefetch, setEnablePrefetch] = useState(false);

  const { data, isLoading, isPlaceholderData } = usePokemons({
    limit: resultsPerPage,
    offset: page * resultsPerPage,
    enablePrefetch,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
      <div>
        <button
          onClick={() => {
            setEnablePrefetch(!enablePrefetch);
          }}
        >
          Prefetch {enablePrefetch ? "ON" : "OFF"}
        </button>
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page <= 0}
        >
          ⬅️ Previous
        </button>
        {"    "}
        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next ➡️
        </button>
        {"    "}
        <PokemonTableResultsPickerContext />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody style={{ opacity: isPlaceholderData ? 0.5 : 1 }}>
          {isLoading && (
            <tr>
              <td colSpan={2}>
                <Loader />
              </td>
            </tr>
          )}
          {!isLoading &&
            data?.results?.map((pokemon) => {
              return (
                <tr key={pokemon.name}>
                  <td>{pokemon.name}</td>
                  <td>
                    <a href={pokemon.url}>{pokemon.url}</a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonTableContext;
