import { useRef } from "react";
import Article from "./Article";
import imageSRC from "../assets/image 6.png";
import "../styles/Nouveautés.scss";
import IvyBranch1 from "./animations/svg/IvyBranch1";
import IvyAnimation from "./animations/IvyAnimation";

function Nouveautés() {
  const ivyRef = useRef(null);

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
