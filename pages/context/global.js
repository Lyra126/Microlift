import React, { createContext, useContext, useState } from "react";

// Create the context
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    email: null,  // Initially set to null
    type: null,   // Initially set to null (true for borrower, false for lender)
  });

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to access the global state and setter
export const useGlobal = () => useContext(GlobalContext);
