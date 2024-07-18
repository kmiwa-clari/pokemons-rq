import React from "react";
import PokemonTableJotai from "../features/pokemon/components/PokemonTableJotai";

function PokemonPageJotai() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2>PokemonTableJotai</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PokemonTableJotai />
      </div>
    </div>
  );
}

export default PokemonPageJotai;
