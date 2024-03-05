import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const ConnexionContext = createContext();

export const useConnexionContext = () => {
  return useContext(ConnexionContext);
};

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [authentification, setAuthentification] = useState(
    localStorage.getItem("authentification") === "true"
  );

  const toggleModal = () => {
    setModal(!modal);
  };
  const closeModal = () => {
    setModal(false);
    setModalTwo(false);
  };
  const toggleModalTwo = () => {
    setModal(!modal);
    setModalTwo(!modalTwo);
  };

  const contextValue = useMemo(
    () => ({
      modal,
      modalTwo,
      toggleModal,
      closeModal,
      toggleModalTwo,
      authentification,
      setAuthentification,
    }),
    [modal, modalTwo, authentification]
  );

  return (
    <ConnexionContext.Provider value={contextValue}>
      {children}
    </ConnexionContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalProvider;
