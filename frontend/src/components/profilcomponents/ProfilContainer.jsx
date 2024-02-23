// Attention composant servant a gérer la navigation du block de gauche MenuProfil

import React from "react";
import { useProfile } from "./ProfileContext";
import MenuProfil from "./MenuProfil";
import UserInfos from "./UserInfos";
import UserCreditCard from "./UserCreditCard";
import UserPassword from "./UserPassword";
import Cadre from "./Cadre";
import "../../styles/ProfilContainer.scss";

function ProfilContainer() {
  const { sectionActive } = useProfile();

  const renderContent = () => {
    switch (sectionActive) {
      case "MesInformations":
        return <UserInfos />;
      case "InformationsDePaiement":
        return <UserCreditCard />;
      case "MotDePasse":
        return <UserPassword />;
      default:
        return <UserInfos />; // Ou un autre composant par défaut
    }
  };

  return (
    <div className="profil-container">
      <MenuProfil />
      <Cadre>{renderContent()}</Cadre>
    </div>
  );
}

export default ProfilContainer;
