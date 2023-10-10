import { createContext, useState } from "react";

export const PeticionContext = createContext();

// eslint-disable-next-line react/prop-types
export const PeticionProvider = ({ children }) => {
  const [isPeticionDetailOpen, setIsPeticionDetailOpen] = useState(false);
  const openPeticionDetail = () => setIsPeticionDetailOpen(true);
  const closePeticionDetail = () => setIsPeticionDetailOpen(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <PeticionContext.Provider
      value={{
        isPeticionDetailOpen,
        openPeticionDetail,
        closePeticionDetail,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </PeticionContext.Provider>
  );
};
