import Article from "./Article";

import imageSRC from "../assets/image 6.png";

import "../styles/Phares.scss";

function Phares() {
  return (
    <section id="phares">
      <div id="phares-title">
        <h2>NOS ARTICLES PHARES</h2>
      </div>
      <div id="phares-articles">
        <div id="phares-articles-content">
          <Article
            image={imageSRC}
            nom="BOUCLE D’OREILLES FEUILLES LOTUS"
            vendeuse="Elya"
            prix="25,00 €"
            isFav={false}
          />
          <Article
            image={imageSRC}
            nom="ILLUSTRATION SIRENE"
            vendeuse="Achlys"
            prix="25,00 €"
            isFav={false}
          />
          <Article
            image={imageSRC}
            nom="PELUCHE CHAMPIGNON"
            vendeuse="Doireann"
            prix="25,00 €"
            isFav={false}
          />
        </div>
      </div>
    </section>
  );
}

export default Phares;
