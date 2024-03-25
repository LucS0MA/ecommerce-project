import React from "react";
import Navbar from "../components/Navbar";
import FooterBis from "../components/FooterBis";
import Error404 from "./404";
import "../styles/Panier.scss";
import ValidationBasket from "../components/ValidationBasket";
import BasketModal from "../components/BasketModal";
import {
  ModalProvider,
  useConnexionContext,
} from "../contexts/ConnexionContext";
import { useBasketContext } from "../contexts/BasketContext";
import BasketContainer from "../components/BasketContainer";

function Panier() {
  const { isBasketClear } = useBasketContext();
  const { authentification } = useConnexionContext();

  if (!authentification) {
    return (
      <ModalProvider>
        <Error404 />
      </ModalProvider>
    );
  }

  return (
    <ModalProvider>
      <Navbar />
      <main className="basket-main">
        {isBasketClear ? (
          <BasketModal />
        ) : (
          <div className="basket-page">
            <BasketContainer />
            <ValidationBasket />
          </div>
        )}
      </main>
      <FooterBis />
    </ModalProvider>
  );
}

export default Panier;
