import axios from "axios";
import { useEffect, useState } from "react";
import Article from "./Article";
import line from "../assets/line.svg";
import "../styles/FiltresArticles.scss";

function FiltresArticles() {
  const [search, setSearch] = useState(""); /// / Valeur de la barre de recherche ////
  const [prixValue, setPrixValue] = useState(200); /// / Valeur de la range prix ////
  const [thematiqueValue, setThematiqueValue] = useState(null); /// / Valeur inputs thématique ////
  const [typeValue, setTypeValue] = useState([]);
  const [CouleurValue, setCouleurValue] = useState(null); /// / Valeur inputs couleur ////
  const [articles, setArticles] = useState([]); /// / Tableau contenant les articles de la BDD ////

  const thematiques = [
    "STEAMPUNK",
    "FANTASY",
    "MEDIEVAL",
    "MAGIE",
    "FEERIE",
    "COTTAGE CORE",
  ];

  const types = [
    "BIJOUX",
    "DECORATION",
    "ILLUSTRATION",
    "VETEMENT",
    "ACCESSOIRE",
  ];

  const couleurs = [
    { nom: "vert", couleur: "#4E5C2C" },
    { nom: "noir", couleur: "#000000" },
    { nom: "marron", couleur: "#82583E" },
    { nom: "jaune", couleur: "#E2B95B" },
    { nom: "orange", couleur: "#DF824D" },
    { nom: "rouge", couleur: "#720F0F" },
    { nom: "bleu", couleur: "#3E7282" },
    { nom: "move", couleur: "#8D214C" },
    { nom: "violet", couleur: "#5A38A3" },
  ];

  /// / Récuperer les articles de la BDD ////
  const getArticles = async () => {
    try {
      const response = await axios.get("http://localhost:3310/api/articles");
      setArticles(response.data);
    } catch (error) {
      console.error(
        "Erreur lors du chargement des données depuis l'API",
        error
      );
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  /// / Fonction permettant de filter les articles////
  const donneesFiltrees = articles.filter((item) => {
    const filtreParNom = !search || item.nom.includes(search);
    const filtreParTheme = !thematiqueValue || item.type === thematiqueValue;
    const filtreParPrix = prixValue >= item.prix;
    const filtreParType =
      typeValue.length === 0 || typeValue.includes(item.thematique);
    const filtreParCouleur = !CouleurValue || item.couleur === CouleurValue;

    return (
      filtreParTheme &&
      filtreParNom &&
      filtreParPrix &&
      filtreParType &&
      filtreParCouleur
    );
  });

  return (
    <main>
      <section id="main_container">
        <div className="filtres_container">
          <h1 className="filters_title">FILTRES</h1>
          <img src={line} alt="" />

          {/* Barre de recherche */}
          <div className="searchBar_container">
            <input
              className="input_search"
              type="texte"
              placeholder="Chercher une création"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Input prix */}
          <div className="filtre_container">
            <div className="filtre_title">
              <h2 className="filter_title">PRIX</h2>
              <img src={line} alt="" />
            </div>
            <div className="label_price">
              <p>min</p>
              <p>max</p>
            </div>
            <input
              className="input_range"
              type="range"
              min="0"
              // max="200"
              defaultValue="200"
              value={prixValue}
              onChange={(e) => setPrixValue(e.target.value)}
            />
            <p>{prixValue} €</p>
          </div>
          {/* Thematique */}
          <div className="filtre_container">
            <div className="filtre_title">
              <h2 className="filter_title">THEMATIQUE</h2>
              <img src={line} alt="" />
            </div>
            <div className="thematique_buttons">
              {thematiques.map((thematique) => (
                <button
                  key={thematique.id}
                  className="thematique_button"
                  type="button"
                  value={thematique}
                  onClick={() => setThematiqueValue(thematique)}
                >
                  {thematique}
                </button>
              ))}
            </div>
          </div>
          {/* Type */}
          <div className="filtre_container">
            <div className="filtre_title">
              <h2 className="filter_title">TYPES</h2>
              <img src={line} alt="" />
            </div>
            <div className="types_buttons">
              {types.map((type) => (
                <div key={type.id}>
                  <input
                    className="type_button"
                    type="checkbox"
                    id={type}
                    value={type}
                    onClick={(e) => setTypeValue(e.target.value)}
                  />
                  <label htmlFor={type}>{type}</label>
                </div>
              ))}
            </div>
          </div>
          {/* Couleurs */}
          <div className="filtre_container">
            <div className="filtre_title">
              <h2 className="filter_title">COULEURS</h2>
              <img src={line} alt="" />
            </div>
            <div className="colors_buttons">
              {couleurs.map((couleur) => (
                <button
                  key={couleur.id}
                  className="color_button"
                  aria-label="bbb"
                  type="button"
                  value={couleur.nom}
                  style={{ backgroundColor: couleur.couleur }}
                  onClick={() => setCouleurValue(couleur.nom)}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="view_articles">
            {donneesFiltrees.map((article) => (
              <Article
                key={article.id}
                image={`http://localhost:3310${article.image}`}
                nom={article.nom}
                vendeuse={article.vendeuse}
                prix={`${article.prix} €`}
                isFav={false}
              />
            ))}
            ;
          </div>
        </div>
      </section>
    </main>
  );
}

export default FiltresArticles;
