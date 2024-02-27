import axios from "axios";
import { useEffect, useState } from "react";
import Article from "./Article";
import Star2 from "./animations/svg/Star2";
import "../styles/Phares.scss";

function Phares() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/articles")
      .then((data) => setArticles(data.data));
  }, []);

  return (
    <section id="phares">
      <div id="phares-title">
        <h2>NOS ARTICLES PHARES</h2>
        <Star2 starClassname="star3" />
        <Star2 starClassname="star4" />
      </div>
      <div id="phares-articles">
        <div id="phares-articles-content">
          {articles.map((article) => (
            <Article
              key={article.id}
              image={`http://localhost:3310${article.image}`}
              nom={article.nom}
              vendeuse={article.vendeuse}
              prix={`${article.prix} €`}
              isFav={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Phares;
