// import axios from "axios";
import { useState } from "react";
import "../styles/ArticlePanier.scss";
import Doireann from "../../../backend/images/boucles_oreilles.png";

function ArticlesPanier() {
  // const [articles, setArticles] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const moreQuantity = () => {
    setQuantity(quantity + 1);
  };

  const lessQuantity = () => {
    setQuantity(quantity - 1);
  };
  // const token = sessionStorage.getItem("token");
  // axios
  //   .get("http://localhost:3310/api/panier/1/", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
  //     },
  //   })
  //   .then((response) => setArticles(response.data))
  //   .catch((err) => console.error(err));

  return (
    <div className="article_panier">
      <img src={Doireann} alt="a" />
      <div className="info_articles_panier">
        <h2>Boucle oreille</h2>
        <p>Elya</p>
        <span>fav</span>
      </div>
      <div className="quantity">
        <input
          className="quantity_bouton"
          type="button"
          value="+"
          onClick={moreQuantity}
        />
        <p>{quantity}</p>
        <input
          className="quantity_bouton"
          type="button"
          value="-"
          onClick={lessQuantity}
        />
      </div>
      <div className="prix_article_panier">
        <p>15 euros</p>
      </div>
    </div>
  );
}

export default ArticlesPanier;
