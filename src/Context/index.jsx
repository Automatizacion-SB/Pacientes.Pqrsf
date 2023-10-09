import { createContext, useState } from "react";

export const PeticionContext = createContext();

// eslint-disable-next-line react/prop-types
export const PeticionProvider = ({ children }) => {
  const [isPeticionDetailOpen, setIsPeticionDetailOpen] = useState(false);
  const openPeticionDetail = () => setIsPeticionDetailOpen(true);
  const closePeticionDetail = () => setIsPeticionDetailOpen(false);

  return (
    <PeticionContext.Provider
      value={{
        isPeticionDetailOpen,
        openPeticionDetail,
        closePeticionDetail,
      }}
    >
      {children}
    </PeticionContext.Provider>
  );
};
