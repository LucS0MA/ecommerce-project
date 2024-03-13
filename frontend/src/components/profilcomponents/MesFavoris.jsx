import axios from "axios";
import { useEffect, useState } from "react";
import { useConnexionContext } from "../../contexts/ConnexionContext";

import Favori from "./Favori";

import "../../styles/MesFavoris.scss";

function MesFavoris() {
  const [utilisateurId] = useState(1);
  const [articles, setArticles] = useState([]);
  const { logout } = useConnexionContext();

  // On récupère les articles favoris de l'utilisateur
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(`http://localhost:3310/api/isFav/0`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      })
      .then((data) => setArticles(data.data))
      .catch((error) => {
        console.error(
          "Erreur lors du chargement des données de l'utilisateur:",
          error
        );
        if (error.response && error.response.status === 401) {
          // Rediriger l'utilisateur vers la page d'accueil
          window.location.href = "/";
          logout(); // Déconnecte l'utilisateur
        }
      });
  }, []);

  return (
    <section id="mes-favoris">
      <h2>FAVORIS</h2>
      <div className="fav-ligne-h" />
      <div id="favs">
        {/* On affiche tous les articles favoris de l'utilisateur */}
        {articles.map((article) => (
          <Favori
            key={article.articles_id}
            articleId={article.articles_id}
            nom={article.nom}
            prix={article.prix}
            utilisateurId={utilisateurId}
          />
        ))}
      </div>
    </section>
  );
}

export default MesFavoris;
