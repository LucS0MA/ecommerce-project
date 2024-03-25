import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NoFav from "../assets/NoFav.svg";
import Fav from "../assets/Fav.svg";
import "../styles/DetailArticle.scss";

function DetailArticle() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [nbCart, setNbCart] = useState(0);
  const [guest, setGuest] = useState(false);
  const [fav, setFav] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios
        .get(`http://localhost:3310/api/isFav/?articleId=${articleId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data && setFav(true))
        .catch((err) => console.error(err));

      axios
        .get(`http://localhost:3310/api/panier/?articleId=${articleId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data && setNbCart(response.data.quantité))
        .catch((err) => console.error(err));
    } else {
      setGuest(true);
    }
  }, []);

  const axiosPost = () => {
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "http://localhost:3310/api/isFav/",
        {
          articleId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => console.error(err));
    console.info(articleId, "post");

    setFav(true);
  };

  const axiosDelete = () => {
    const token = sessionStorage.getItem("token");
    axios
      .delete(`http://localhost:3310/api/isFav/?articleId=${articleId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => console.error(err));
    console.info(articleId, "delete");

    setFav(false);
  };

  const handleFav = () => {
    if (!fav) {
      axiosPost();
    } else {
      axiosDelete();
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3310/api/articles/${articleId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setArticle(response.data);
        console.info(article.image);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  const axiosPostPanier = () => {
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "http://localhost:3310/api/panier/",
        {
          articleId,
          quantité: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => console.error(err));
    console.info(articleId, "add to cart");
  };

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
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => console.error(err));
    console.info(articleId, "add another to cart");
  };

  const showAddToCartNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const handleCart = () => {
    if (nbCart === 0) {
      axiosPostPanier(quantity);
      setNbCart(nbCart + quantity);
      showAddToCartNotification();
    }

    if (nbCart > 0) {
      axiosPutPanier(nbCart, quantity);
      setNbCart(nbCart + quantity);
      showAddToCartNotification();
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <main className="detail-page">
      <div className="outLine">
        <div className={`detail-container ${article.vendeuse}`}>
          <div className="detail-left">
            <img
              className="detail-image"
              src={`http://localhost:3310${article.image}`}
              alt={article.nom}
            />
          </div>
          <div className="detail-right">
            <h1 className="detail-title">{article.nom}</h1>
            <p>Vendeuse: {article.vendeuse}</p>
            <p>Prix: {article.prix} €</p>
            <div>
              <label htmlFor="quantity">Quantité:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              />
            </div>
            <div className="detail-logos">
              <button
                className="detail-button-add"
                type="button"
                onClick={() => {
                  handleCart();
                }}
              >
                AJOUTER AU PANIER
              </button>
              {fav ? (
                <button
                  className="favorite-button"
                  onClick={!guest ? handleFav : () => setFav(!fav)}
                  aria-label="Toggle favorite"
                  type="button"
                >
                  <img
                    src={Fav}
                    alt={fav ? "Favorited" : "Not favorited"}
                    className={fav ? "favorite-icon filled" : "favorite-icon"}
                  />
                </button>
              ) : (
                <button
                  className="favorite-button"
                  onClick={!guest ? handleFav : () => setFav(!fav)}
                  aria-label="Toggle favorite"
                  type="button"
                >
                  <img
                    src={NoFav}
                    alt={fav ? "Favorited" : "Not favorited"}
                    className={fav ? "favorite-icon filled" : "favorite-icon"}
                  />
                </button>
              )}
            </div>
            {showNotification && (
              <div className="detail-notification">
                Article bien ajouté au panier
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailArticle;
