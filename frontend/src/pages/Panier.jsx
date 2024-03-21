import Navbar from "../components/Navbar";
import FooterBis from "../components/FooterBis";
import "../styles/Panier.scss";
import ValidationBasket from "../components/ValidationBasket";
import { ModalProvider } from "../contexts/ConnexionContext";
import BasketContainer from "../components/BasketContainer";

function Panier() {
  return (
    <ModalProvider>
      <Navbar />
      <div className="basket-page">
        <BasketContainer />
        <ValidationBasket />
      </div>
      <FooterBis />
    </ModalProvider>
  );
}

export default Panier;
