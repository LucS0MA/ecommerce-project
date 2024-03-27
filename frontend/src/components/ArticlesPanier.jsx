import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/ArticlePanier.scss";
import Favori from "./profilcomponents/Favori";

function ArticlesPanier({ articlesId, image, nom, vendeuse, quantité, prix }) {
  const [articleId] = useState(articlesId);
  const [quantity, setQuantity] = useState(quantité);

  // Ajout d'un article supplémentaire dans le panier//
  const axiosPutPanierPlus = (nb) => {
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
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setQuantity(nb + 1);
      })
      .catch((err) =>
        console.error("Erreur lors de la mise à jour des quantités", err)
      );
  };

  // Suppréssion d'un article dans le panier//
  const axiosPutPanierMoins = (nb) => {
    const token = sessionStorage.getItem("token");

    axios
      .put(
        `http://localhost:3310/api/panier/?articleId=${articleId}`,
        {
          quantité: nb - 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        if (nb >= 1) {
          setQuantity(nb - 1);
        }
      })
      .catch((err) =>
        console.error("Erreur lors de la mise à jour des quantités", err)
      );
  };

  return (
    <div className="article_panier_container">
      <div className="articles-panier">
        <div className="container-image-infos-article">
          <Link
            to={`/catalogue/${articleId}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
            }}
          >
            <img
              src={`http://localhost:3310${image}`}
              alt="a"
              className={`article-image ${vendeuse}`}
            />
          </Link>
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
            onClick={() => axiosPutPanierMoins(quantity)}
          />
          <p>{quantity}</p>
          <input
            className="quantity_bouton plus"
            type="button"
            onClick={() => axiosPutPanierPlus(quantity)}
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
