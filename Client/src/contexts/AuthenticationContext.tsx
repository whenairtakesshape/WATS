/**
 * Authentication context file. 
 * AuthenticationContext has two boolean states.
 * authenticated determines if user has been authenticated.
 * adminAuthWindow is used to check if the user is requesting the admin window pop up. 
 */
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";
import { City, CityCountry, Country, Datapoint } from "../model/DataHandler";


export interface AuthenticationInterface {
  adminAuthWindow: boolean;
  authenticated: boolean,
  setAdminAuthWindow: Dispatch<SetStateAction<boolean>>;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const defaultState = {
  adminAuthWindow: false,
  authenticated: false,
  setAdminAuthWindow: (adminAuthWindow: boolean) => { },
  setAuthenticated: (authenticated: boolean) => { }
} as AuthenticationInterface;

export const AuthenticationContext = createContext<AuthenticationInterface>(defaultState)

