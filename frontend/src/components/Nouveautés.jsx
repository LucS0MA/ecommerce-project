import Article from "./Article";

import imageSRC from "../assets/image 6.png";

import "../styles/Nouveautés.scss";

function Nouveautés() {
  return (
    <section id="nouveautés">
      <div id="nouveautés-content">
        <h2 id="nouveautés-title">NOUVEAUTÉS SUR LE SITE</h2>
        <div id="nouveautés-articles">
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
          <button type="button">EN VOIR PLUS</button>
        </div>
      </div>
    </section>
  );
}

export default Nouveautés;
