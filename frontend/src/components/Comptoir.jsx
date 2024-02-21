import comptoirIMG from "../assets/comptoir.svg";

import "../styles/Comptoir.scss";

function Comptoir() {
  return (
    <section id="comptoir">
      <img src={comptoirIMG} alt="comptoir" />
      <div id="comptoir-container">
        <div id="comptoir-content">
          <h2>AU COMPTOIR DES SEELIES</h2>
          <p>
            Plongez dans un monde artisanal envoûtant, où chaque création est
            une porte ouverte vers la magie.
            <br />
            Au <strong>Comptoir des Seelies,</strong> quatre artisanes
            exceptionnelles captivent vos sens.
            <br />
            Chaque pièce est imprégnée de passion et de compétence, faisant du
            Comptoir un lieu où l'extraordinaire devient réalité.
            <br />
          </p>
          <button type="button">EN SAVOIR PLUS</button>
        </div>
      </div>
    </section>
  );
}

export default Comptoir;
