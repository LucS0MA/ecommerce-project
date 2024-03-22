import Navbar from "../components/Navbar";
import FooterBis from "../components/FooterBis";
import "../styles/Panier.scss";
import ValidationBasket from "../components/ValidationBasket";
import BasketModal from "../components/BasketModal";
import { ModalProvider } from "../contexts/ConnexionContext";
import { useBasketContext } from "../contexts/BasketContext";
import BasketContainer from "../components/BasketContainer";

function Panier() {
  const { isBasketClear } = useBasketContext();
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
