import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FooterBis from "../components/FooterBis";
import Connexion from "../components/Connexion";
import { ModalProvider } from "../contexts/ConnexionContext";
import Sellers from "../components/Sellers";
import "../styles/About.scss";

function About() {
  const [selectedSeller, setSelectedSeller] = useState(null);

  const sellerTextMap = {
    Dahlia: "Texte pour la vendeuse 1",
    Doireann: "Texte pour la vendeuse 2",
    Achlys: "Texte pour la vendeuse 3",
    Elya: "Texte pour la vendeuse 4",
  };

  const handleSellerSelect = (sellerName) => {
    setSelectedSeller(sellerName);
  };

  const getTextForSeller = () => {
    return selectedSeller
      ? sellerTextMap[selectedSeller]
      : "Plongez dans un monde artisanal envoûtant, où chaque création est une porte ouverte vers la magie. Dans ce royaume féérique du Comptoir des Seelies, quatre fées bienveillantes veillent sur chaque création avec une grâce infinie. Chaque pièce est imprégnée de passion et de compétence, faisant du Comptoir un lieu où l'extraordinaire devient réalité.";
  };

  return (
    <ModalProvider>
      <header>
        <Navbar />
        <Connexion />
      </header>
      <main>
        <Sellers onSellerSelect={handleSellerSelect} />
        <p className="text">{getTextForSeller()}</p>
      </main>
      <footer>
        <FooterBis />
      </footer>
    </ModalProvider>
  );
}

export default About;
