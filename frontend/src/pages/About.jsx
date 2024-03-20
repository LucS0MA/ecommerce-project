import Navbar from "../components/Navbar";
import FooterBis from "../components/FooterBis";
import Connexion from "../components/Connexion";
import { ModalProvider } from "../contexts/ConnexionContext";
import Sellers from "../components/Sellers";
import "../styles/About.scss";

function About() {
  return (
    <ModalProvider>
      <header>
        <Navbar />
        <Connexion />
      </header>
      <main>
        <Sellers />
        <p className="text">
          Plongez dans un monde artisanal envoûtant, où chaque création est une
          porte ouverte vers la magie.
          <br />
          Au <strong>Comptoir des Seelies,</strong> quatre artisanes
          exceptionnelles captivent vos sens.
          <br />
          Chaque pièce est imprégnée de passion et de compétence, faisant du
          Comptoir un lieu où l'extraordinaire devient réalité.
          <br />
        </p>
      </main>
      <footer>
        <FooterBis />
      </footer>
    </ModalProvider>
  );
}

export default About;
