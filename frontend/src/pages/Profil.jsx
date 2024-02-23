import React from "react";
import "../styles/Profil.scss";
import { ProfileProvider } from "../components/profilcomponents/ProfileContext";
import ProfilContainer from "../components/profilcomponents/ProfilContainer"; // Importez ProfilContainer

function Profil() {
  return (
    <ProfileProvider>
      <div className="profil-page">
        <ProfilContainer />{" "}
        {/* Ceci inclut MenuProfil et le contenu conditionnel */}
      </div>
    </ProfileProvider>
  );
}

export default Profil;
