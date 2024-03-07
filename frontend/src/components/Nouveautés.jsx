import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Article from "./Article";
import "../styles/Nouveautés.scss";
import IvyBranch1 from "./animations/svg/IvyBranch1";
import IvyAnimation from "./animations/IvyAnimation";

function Nouveautés() {
  const ivyRef = useRef(null);

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/articles/?nouveautes=1&limit=3")
      .then((response) => setArticles(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="nouveautés">
      <IvyAnimation
        ivyId="ivyNew"
        ivyRef={ivyRef}
        start="top +=500"
        end="bottom top"
      >
        <IvyBranch1 />
      </IvyAnimation>
      <div id="nouveautés-content">
        <h2 id="nouveautés-title">NOUVEAUTÉS SUR LE SITE</h2>
        <div id="nouveautés-articles">
          {articles.map((article) => (
            <Article
              key={article.id}
              id={article.id}
              image={`http://localhost:3310${article.image}`}
              nom={article.nom}
              vendeuse={article.vendeuse}
              prix={`${article.prix} €`}
            />
          ))}
          <button type="button">EN VOIR PLUS</button>
        </div>
      </div>
    </section>
  );
}

export default Nouveautés;
