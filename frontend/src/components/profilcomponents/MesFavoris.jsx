import axios from "axios";
import { useState, useEffect } from "react";
import Favori from "./Favori";
import "../../styles/MesFavoris.scss";

function MesFavoris() {
  const [utilisateurId] = useState(1);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/isFav/${utilisateurId}`)
      .then((data) => setArticles(data.data));
  }, []);

  return (
    <section id="mes-favoris">
      <h2>FAVORIS</h2>
      <div className="fav-ligne-h" />
      <div id="favs">
        {articles.map((article) => (
          <Favori
            key={article.articles_id}
            id={article.articles_id}
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
