import React, { useState } from 'react';
import usePokemons from '../hooks/usePokemons';

const RECORDS_PER_PAGE = 20;

function PokemonTable() {
  const [page, setPage] = useState(0);

  const { data, isLoading } = usePokemons({ limit: RECORDS_PER_PAGE, offset: page * RECORDS_PER_PAGE });
  return (
    <div>
    <div>
      <button
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page <= 0}
      >
        ⬅️ Previous
      </button>

      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next ➡️
      </button>
    </div>
    <table width="100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Link</th>
        </tr>
      </thead>

      <tbody>
        {isLoading && (
          <tr>
            <td colSpan={2}>
              <Loader />
            </td>
          </tr>
        )}
        {!isLoading && data?.results?.map((pokemon) => {
          return (
            <tr key={pokemon.name}>
              <td>{pokemon.name}</td>
              <td><a href={pokemon.url}>{pokemon.url}</a></td>
            </tr>
          )
        })}
    </tbody>
    </table>
    </div>

  )
}

function Loader() {
  return (
    <div style={{ minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <b>Loading...</b>
    </div>
  )
}
export default PokemonTable;