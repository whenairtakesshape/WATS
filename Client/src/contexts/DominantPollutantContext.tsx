/**
 * Dominant Pollutant Context file
 */
import { createContext, Dispatch, SetStateAction } from "react";


export interface DominantPollutantInterface {
  dominantPollutant: string | null;
  setDominantPollutant: Dispatch<SetStateAction<string | null>>;
};

const defaultState = {
  dominantPollutant: "",
  setDominantPollutant: (dominantPollutant: string) => { }
} as DominantPollutantInterface;

export const DominantPollutantContext = createContext<DominantPollutantInterface>(defaultState)

