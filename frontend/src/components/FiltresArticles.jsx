import "../styles/FiltresArticles.scss";
import { useState } from "react";
import loupe from "../assets/loupe.svg";
import line from "../assets/line.svg";

function FiltresArticles() {
  const [rangeValue, setRangeValue] = useState(0);

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
    "#4E5C2C",
    "#000000",
    "#82583E",
    "#E2B95B",
    "#DF824D",
    "#720F0F",
    "#3E7282",
    "#8D214C",
    "#5A38A3",
  ];

  return (
    <main>
      <section className="filtres_container">
        <h1 className="filters_title">FILTRES</h1>
        <img src={line} alt="" />
        {/* Barre de recherche */}

        <div className="searchBar">
          <img src={loupe} alt="icone_loupe" />
          <input
            className="input_search"
            type="search"
            placeholder="Chercher une création"
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
            max="500"
            defaultValue={rangeValue}
            onChange={(e) => setRangeValue(e.target.value)}
          />
          <p>{rangeValue} €</p>
        </div>
        {/* Thematique */}
        <div className="filtre_container">
          <div className="filtre_title">
            <h2 className="filter_title">THEMATIQUE</h2>
            <img src={line} alt="" />
          </div>
          <div className="thematique_buttons">
            {thematiques.map((thematique) => (
              <button className="thematique_button" type="button">
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
              <div>
                <input className="type_button" type="checkbox" id={type} />
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
                aria-label="bbb"
                key={couleur}
                className="colors_button"
                type="button"
                style={{
                  backgroundColor: couleur,
                  width: `30px`,
                  height: `30px`,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default FiltresArticles;
