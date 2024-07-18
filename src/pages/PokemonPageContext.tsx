import React from "react";
import PokemonTableContext from "../features/pokemon/components/PokemonTableContext";
import { PokemonTableProvider } from "../features/pokemon/components/providers/PokemonTableProvider";

function PokemonPageJotai() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2>PokemonTableContext</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <PokemonTableProvider>
        <PokemonTableContext />
      </PokemonTableProvider>
      </div>
    </div>
  );
}

export default PokemonPageJotai;
