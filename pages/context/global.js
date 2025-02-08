import React, { createContext, useContext, useState } from "react";

// Create the context
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    email: null, // set to email
    type: null, // true - borrower, false - lender
  });

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

// to access the global state and setter
export const useGlobal = () => useContext(GlobalContext);
