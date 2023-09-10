import { createContext, Dispatch, SetStateAction } from "react";
import { WindowSize } from "../model/interfaces";


export interface WindowSizeInterface {
  windowObject: WindowSize,
  setWindowObject: Dispatch<SetStateAction<WindowSize>>;
};

const defaultState = {
  windowObject: {
    width: 0,
    height: 0
  },
  setWindowObject: (windowObject: WindowSize) => { }
} as WindowSizeInterface;

export const WindowContext = createContext<WindowSizeInterface>(defaultState);
