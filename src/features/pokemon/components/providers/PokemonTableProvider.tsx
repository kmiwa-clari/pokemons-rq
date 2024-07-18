import React, { createContext, useContext, useState } from "react";
import { DEFAULT_RECORDS_PER_PAGE } from "../../constants/pokemonTable";


type PokemonTableContextType = {
  page: number;
  setPage: (page: number) => void;
  resultsPerPage: number;
  setResultsPerPage: (resultsPerPage: number) => void;
};

// Create a Context
const PokemonTableContext = createContext<PokemonTableContextType | undefined>(undefined);

// PokemonTable Provider Component
export const PokemonTableProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(DEFAULT_RECORDS_PER_PAGE);

  const value = {
    page,
    setPage,
    resultsPerPage,
    setResultsPerPage,
  };

  return (
    <PokemonTableContext.Provider value={value}>
      {children}
    </PokemonTableContext.Provider>
  );
};

// Custom hook to use the PokemonTableContext
export const usePokemonTable = () => {
  const context = useContext(PokemonTableContext);
  if (context === undefined) {
    throw new Error('usePokemonTable must be used within a PokemonTableProvider');
  }
  return context;
};