import usePokemonDetails from "../hooks/usePokemonDetails";
import React from "react";

function PokemonPic({ name }) {
  const { data } = usePokemonDetails({ name });

  const imgUrl = data?.sprites?.front_default;

  return imgUrl ? (
    <img src={data?.sprites?.front_default} alt={name} />
  ) : (
    <div
      style={{
        display: "inline-block",
        width: "96px",
        height: "96px",
        backgroundColor: "lightgray",
      }}
    />
  );
}

export default PokemonPic;
