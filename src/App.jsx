import { useEffect, useState } from 'react'
import './App.css'
import { queryClient } from './main'
import { useQuery } from '@tanstack/react-query'


async function fetchPokemons() {
  const resp = await fetch('https://pokeapi.co/api/v2/pokemon');
  const data = await resp.json();
  return data;
}

function usePokemons() {
  return useQuery({
    queryKey: 'pokemons',
    queryFn: () => fetchPokemons(),
  });
}

function PokemonsUseEffect() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    queryClient.fetchQuery({
      queryKey: 'pokemons',
      queryFn: () => fetchPokemons(),
    })
    .then((data) => {
      setPokemons(data.results);
    });
  }, []);


  return (
    <div>
      {pokemons.map((pokemon) => (
        <p key={pokemon.name}>{pokemon.name}</p>
      ))}
    </div>
  );
}

function Pokemons() {
  const { data, isLoading } = usePokemons();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data?.results.map((pokemon) => (
        <p key={pokemon.name}>{pokemon.name}</p>
      ))}
    </div>
  );
}


function App() {
  const [is2ndRender, setIs2ndRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIs2ndRender(true);
    }, 100);
  }, []);

  return (
    <>
      <Pokemons />
      <Pokemons />
      <Pokemons />
      <Pokemons />
      <Pokemons />
      {is2ndRender && <Pokemons />}
    </>
  )
}

export default App
