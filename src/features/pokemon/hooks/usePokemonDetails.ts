import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchPokemonDetails({ name }) {
  const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return resp?.data;
}

export default function usePokemonDetails({ name }) {
  return useQuery({
    queryKey: ["pokemon-details", name],
    queryFn: () => fetchPokemonDetails({ name }),
    staleTime: 5000,
    refetchOnMount: false,
  });
}
