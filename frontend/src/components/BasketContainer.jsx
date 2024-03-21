import basketIcon from "../assets/panier_icon.svg";
import "../styles/BasketContainer.scss";

function BasketContainer() {
  return (
    <div id="basketContainer">
      <div id="basketDetail">
        <div id="basketHeading">
          <div id="basketLogo">
            <img src={basketIcon} alt="basket_icon" />
          </div>
          <h1>Ton panier</h1>
        </div>
        <ul id="basketFilter">
          <li>Produit</li>
          <li>Quantité</li>
          <li>Prix</li>
        </ul>
        <div id="basketContent">{/* Product */}</div>
      </div>
    </div>
  );
}

export default BasketContainer;
