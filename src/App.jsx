import { useEffect, useState } from 'react'
import './App.css'
import { queryClient } from './main'
import usePokemons from './hooks/usePokemons';


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
  const { data, isLoading } = usePokemons({});
  console.log({data})

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


function App() {
  return (
    <>
      <Pokemons />
    </>
  )
}

export default App
