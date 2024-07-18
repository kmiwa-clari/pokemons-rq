import React from "react";
import usePokemons from "../features/pokemon/hooks/usePokemons";

function PokemonsPage() {
  const { data, isLoading } = usePokemons();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data?.results?.map((pokemon) => (
        <p key={pokemon.name}>{pokemon.name}</p>
      ))}
    </div>
  );
}

export default PokemonsPage;
