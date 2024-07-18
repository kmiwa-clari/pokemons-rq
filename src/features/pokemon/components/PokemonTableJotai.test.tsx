import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import PokemonTableJotai from "./PokemonTableJotai";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

jest.mock("axios");

const mockAxios = axios as jest.Mocked<typeof axios>;

const firstPageResponse = {
  "count": 100,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=0&limit=3",
  "previous": null,
  "results": [
      {
          "name": "bulbasaur",
          "url": "https://pokeapi.co/api/v2/pokemon/1/"
      },
      {
          "name": "ivysaur",
          "url": "https://pokeapi.co/api/v2/pokemon/2/"
      },
      {
          "name": "venusaur",
          "url": "https://pokeapi.co/api/v2/pokemon/3/"
      },
  ]
};

const secondPageResponse = {
  "count": 100,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=3&limit=3",
  "previous": null,
  "results": [
      {
          "name": "charmander",
          "url": "https://pokeapi.co/api/v2/pokemon/4/"
      },
      {
          "name": "charmeleon",
          "url": "https://pokeapi.co/api/v2/pokemon/5/"
      },
      {
          "name": "charizard",
          "url": "https://pokeapi.co/api/v2/pokemon/6/"
      },
  ]
};

function TestProviders({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

describe("PokemonTableJotai", () => {
  it("should render table data", async () => {
    // Given /pokemons returns a list of pokemons
    mockAxios.get.mockResolvedValue({
      data: firstPageResponse,
    });

    // When component renders
    render(
      <TestProviders>
        <PokemonTableJotai />
      </TestProviders>
    );

    // When data loads
    await waitForElementToBeRemoved(() => screen.getByTestId("loader-container"));

    // Then nav buttons exist
    expect(screen.getByRole("button", { name: /Prefetch OFF/ })).toBeInTheDocument();
    // The previous button is disabled
    expect(screen.getByRole("button", { name: /Previous/ })).toHaveProperty('disabled', true);
    expect(screen.getByRole("button", { name: /Next/ })).toBeInTheDocument();

    // Then table data is rendered
    expect(screen.getByRole("row", { name: "Name Link" })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: "bulbasaur https://pokeapi.co/api/v2/pokemon/1/" })).toBeInTheDocument();
  });

  it("should navigate to next page", async () => {
    // Given /pokemons returns a list of pokemons for 2 different pages
    mockAxios.get
      .mockResolvedValueOnce({
        data: firstPageResponse,
      })
      .mockResolvedValueOnce({
        data: secondPageResponse,
      });

    // When component renders
    render(
      <TestProviders>
        <PokemonTableJotai />
      </TestProviders>
    );

    // When data loads
    await waitForElementToBeRemoved(() => screen.getByTestId("loader-container"));

    // When Next is clicked
    fireEvent.click(screen.getByRole("button", { name: /Next/ }));

    // When data loads
    await waitForElementToBeRemoved(() => screen.getByTestId("loader-container"));

    // The previous button is not disabled
    expect(screen.getByRole("button", { name: /Previous/ })).toHaveProperty('disabled', false);

    // Then 2nd page data exists
    expect(screen.getByRole("row", { name: "Name Link" })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: "charmander https://pokeapi.co/api/v2/pokemon/4/" })).toBeInTheDocument();
  });
});
