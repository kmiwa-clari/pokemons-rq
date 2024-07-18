import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { DEFAULT_RECORDS_PER_PAGE } from "../constants/pokemonTable";

async function fetchPokemons({ limit, offset }) {
  const resp = await axios.get("https://pokeapi.co/api/v2/pokemon", {
    params: { limit, offset },
  });
  return resp?.data;
}

export default function usePokemons({
  limit = DEFAULT_RECORDS_PER_PAGE,
  offset = 0,
  enablePrefetch = false,
} = {}) {
  const queryClient = useQueryClient();

  useEffect(() => {

    if (!enablePrefetch) {
      return;
    }

    queryClient.prefetchQuery({
      queryKey: [
        "pokemons",
        { limit, offset: offset + limit },
      ],
      queryFn: () =>
        fetchPokemons({ limit, offset: offset + limit }),
      staleTime: Infinity,
    });
  }, [limit, offset, enablePrefetch, queryClient]);

  return useQuery({
    queryKey: ["pokemons", { limit, offset }],
    queryFn: () => fetchPokemons({ limit, offset }),
    staleTime: Infinity,
    // placeholderData: prevData => {
    //   return prevData;
    // }
  });
}
