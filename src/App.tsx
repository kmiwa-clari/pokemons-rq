import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import HomePage from "./pages/HomePage";
import PokemonsPage from "./pages/PokemonsPage";
import PokemonPageJotai from "./pages/PokemonPageJotai";
import PokemonPageContext from "./pages/PokemonPageContext";
import NoMatchPage from "./pages/NoMatchPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="pokemons" element={<PokemonsPage />} />
        <Route path="table-jotai" element={<PokemonPageJotai />} />
        <Route path="table-context" element={<PokemonPageContext />} />
        <Route path="*" element={<NoMatchPage />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/table-jotai">Table Jotai</a>
          </li>
          <li>
            <a href="/table-context">Table Context</a>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
