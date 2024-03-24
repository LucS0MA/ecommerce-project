import axios from "axios";
import { useState, useEffect } from "react";
import { useBasketContext } from "../contexts/BasketContext";
import "../styles/ValidationBasket.scss";

function ValidationBasket() {
  const { setIsBasketClear } = useBasketContext();
  const [nbArticles, setNbArticles] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get("http://localhost:3310/api/panier/0", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const totalQuantity = response.data.reduce(
          (total, article) => total + article.quantité,
          0
        );
        const totalPrice = response.data.reduce(
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

  const handleValidBasket = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = sessionStorage.getItem("token");

    if (nbArticles === 0) {
      setIsLoading(false);
      return;
    }

    try {
      const responsePanier = await axios.get(
        "http://localhost:3310/api/panier",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (responsePanier.data && responsePanier.data.length > 0) {
        const articlesDuPanier = responsePanier.data;

        await axios.post(
          "http://localhost:3310/api/commandes",
          { articles: articlesDuPanier },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await axios.delete("http://localhost:3310/api/panier", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setNbArticles(0);
        setPriceTotal(0);
        setIsBasketClear(true);
      }
    } catch (error) {
      console.error("Erreur lors de la validation du panier:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="firstBorder">
      <div className="secondBorder">
        <div className="quantityBasket"> {nbArticles} articles</div>
        <div className="ligneBasket" />
        <div className="totalBasket">TOTAL {priceTotal}€</div>
        <button
          type="button"
          className="paymentBasket"
          onClick={handleValidBasket}
          disabled={isLoading}
        >
          {isLoading ? "En cours..." : "VALIDER MON PANIER"}
        </button>
      </div>
    </main>
  );
}

export default ValidationBasket;
