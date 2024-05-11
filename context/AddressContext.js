import React, { createContext, useState, useContext } from "react";

// Create the context
const AddressContext = createContext();

// Create the provider component
export const AddressProvider = ({ children }) => {
  const [currentAddress, setCurrentAddress] = useState("");

  // Function to update the address
  const updateAddress = (newAddress) => {
    setCurrentAddress(newAddress);
  };

  return (
    <AddressContext.Provider value={{ currentAddress, updateAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

// Custom hook to use the address context
export const useAddress = () => useContext(AddressContext);
