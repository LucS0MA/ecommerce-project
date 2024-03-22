import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/ArticlePanier.scss";

function ArticlesPanier() {
  const [articles, setArticles] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const moreQuantity = () => {
    if (quantity <= 49) {
      setQuantity(quantity + 1);
    }
  };

  const lessQuantity = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get("http://localhost:3310/api/panier/5", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      })
      .then((response) => setArticles(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="article_panier_container">
      {articles.map((article) => (
        <>
          <div className="articles-panier">
            <img
              src={`http://localhost:3310${article.image}`}
              alt="a"
              className={`article-image ${article.vendeuse}`}
            />

            <div className="info_articles_panier">
              <p className="article-panier-nom">{article.nom}</p>
              <div className="line-info-article"> </div>
              <p>{article.vendeuse}</p>
              <span>fav</span>
            </div>
            <div className="quantity">
              <input
                className="quantity_bouton moins"
                type="button"
                onClick={lessQuantity}
              />
              <p>{article.quantité}</p>
              <input
                className="quantity_bouton plus"
                type="button"
                onClick={moreQuantity}
              />
            </div>
            <div className="prix_article_panier">
              <p>{article.prix}€</p>
            </div>
          </div>
          <div className="end-line"> </div>
        </>
      ))}
    </div>
  );
}

export default ArticlesPanier;
