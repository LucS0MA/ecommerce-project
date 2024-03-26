import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/AdminArticle.scss";
// import Modif from "../../assets/Modif.svg";
// import Delete from "../../assets/Delete.svg";

function AdminArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get("http://localhost:3310/api/articles", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      })
      .then((response) => setArticles(response.data))
      .catch((err) => console.error(err));
  }, []);

  // const handleModif = () => {
  //   console.info("Mofifié");
  // };
  // const handleDelete = () => {
  //   console.info("Supprimé");
  // };
  return (
    <div className="article_admin_container">
      {articles.map((article) => (
        <>
          <div className="articles-admin">
            <img
              src={`http://localhost:3310${article.image}`}
              alt="a"
              className={`img-article article-image ${article.vendeuse}`}
            />
            <div className="info_articles_admin">
              <p className="article-admin-nom">{article.nom}</p>
              <div className="line-info-article"> </div>
              <p>{article.vendeuse}</p>
            </div>
            <div className="prix_article_admin">
              <p>{article.prix}€</p>
            </div>
            <div className="vendu">
              <p className="article-vendu">VENDU</p>
              <p className="article-nombre-vendu">{article.nb_ventes}</p>
            </div>
            {/* <img
              src={Modif}
              alt="Modif"
              className="admin-modification"
              onClick={() => handleModif()}
            />
            <img
              src={Delete}
              alt="Delete"
              className="admin-delete"
              onClick={() => handleDelete()}
            /> */}
          </div>
          <div className="end-line"> </div>
        </>
      ))}
    </div>
  );
}

export default AdminArticles;
