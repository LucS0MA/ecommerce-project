import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/ValidationBasket.scss";

function ValidationBasket() {
  const [nbArticles, setNbArticles] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get("http://localhost:3310/api/panier/0", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      })
      .then((response) => {
        const articles = response.data;
        console.info(articles);
        const totalQuantity = articles.reduce(
          (total, article) => total + article.quantité,
          0
        );
        const totalPrice = articles.reduce(
          (total, article) => total + article.quantité * article.prix,
          0
        );
        setNbArticles(totalQuantity);
        setPriceTotal(totalPrice.toFixed(2));
      })
      .catch((error) =>
        console.error("Erreur chargement des articles du panier:", error)
      );
  }, []);

  return (
    <main className="firstBorder">
      <div className="secondBorder">
        <div className="quantityBasket"> {nbArticles} articles</div>
        <div className="ligneBasket" />
        <div className="totalBasket">TOTAL {priceTotal}€</div>
        <button type="button" className="paymentBasket">
          VALIDER MON PANIER
        </button>
      </div>
    </main>
  );
}

export default ValidationBasket;
