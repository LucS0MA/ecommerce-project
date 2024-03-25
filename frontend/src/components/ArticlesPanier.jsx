import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/ArticlePanier.scss";
import Favori from "./profilcomponents/Favori";

function ArticlesPanier({ articlesId, image, nom, vendeuse, quantité, prix }) {
  const [articleId] = useState(articlesId);
  const [quantity, setQuantity] = useState(1);

  const axiosPutPanier = (nb) => {
    const token = sessionStorage.getItem("token");

    axios
      .put(
        `http://localhost:3310/api/panier/?articleId=${articleId}`,
        {
          quantité: nb + 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
          },
        }
      )
      .catch((err) => console.error(err));
    console.info(articleId, "add another to cart");
  };

  const moreQuantity = () => {
    axiosPutPanier(quantity);
    setQuantity(quantity + 1);
  };

  const lessQuantity = () => {
    axiosPutPanier(quantity);
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  //

  return (
    <div className="article_panier_container">
      <div className="articles-panier">
        <div className="container-image-infos-article">
          <img
            src={`http://localhost:3310${image}`}
            alt="a"
            className={`article-image ${vendeuse}`}
          />
          <div className="info_article_panier">
            <p className="article-panier-nom">{nom}</p>
            <div className="line-info-article"> </div>
            <p>{vendeuse}</p>
            <Favori />
          </div>
        </div>
        <div className="quantity">
          <input
            className="quantity_bouton moins"
            type="button"
            onClick={() => lessQuantity()}
          />
          <p>{quantité}</p>
          <input
            className="quantity_bouton plus"
            type="button"
            onClick={() => moreQuantity()}
          />
        </div>
        <div className="prix_article_panier">
          <p>{prix}€</p>
        </div>
      </div>
      <div className="end-line"> </div>
    </div>
  );
}

ArticlesPanier.propTypes = {
  articlesId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  nom: PropTypes.string.isRequired,
  vendeuse: PropTypes.string.isRequired,
  prix: PropTypes.string.isRequired,
  quantité: PropTypes.number.isRequired,
};

export default ArticlesPanier;
