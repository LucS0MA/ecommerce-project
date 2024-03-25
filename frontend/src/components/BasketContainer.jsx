import axios from "axios";
import { useEffect, useState } from "react";
import basketIcon from "../assets/panier_icon.svg";
import "../styles/BasketContainer.scss";
import ArticlesPanier from "./ArticlesPanier";

function BasketContainer() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(`http://localhost:3310/api/panier/0`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      })
      .then((response) => setArticles(response.data))
      .catch((err) => console.error(err));
  }, []);

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
        <div id="basketContent">
          {articles.map((article) => (
            <ArticlesPanier
              key={article.id}
              articlesId={article.articles_id}
              image={article.image}
              nom={article.nom}
              vendeuse={article.vendeuse}
              quantité={article.quantité}
              prix={article.prix}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BasketContainer;
