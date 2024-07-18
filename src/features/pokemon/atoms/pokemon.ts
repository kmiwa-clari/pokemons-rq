import { atom, useAtom } from "jotai";
import { DEFAULT_RECORDS_PER_PAGE } from "../constants/pokemonTable";

const resultsPerPageAtom = atom(DEFAULT_RECORDS_PER_PAGE);
const pageIndexAtom = atom(0);

export function useResultsPerPage() {
  return useAtom(resultsPerPageAtom);
}

export function usePageIndex() {
  return useAtom(pageIndexAtom);
}

