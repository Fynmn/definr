import React, { createContext, useState } from "react";

// Create the context
const ModalContext = createContext();

// Create a provider component for the context
function ModalContextProvider({ children }) {
  const [value, setValue] = useState(false);

  const toggleValue = () => {
    setValue((prevValue) => !prevValue);
  };

  return (
    <ModalContext.Provider value={{ value, setValue }}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalContextProvider };
