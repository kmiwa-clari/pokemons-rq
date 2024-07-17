import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchPokemons({ limit, offset }) {
  const resp = await axios.get('https://pokeapi.co/api/v2/pokemon', { params: { limit, offset } });
  return resp?.data;
}

export default function usePokemons({ limit, offset }) {
  return useQuery({
    queryKey: ['pokemons', { limit, offset }],
    queryFn: () => fetchPokemons({ limit, offset }),
  });
}