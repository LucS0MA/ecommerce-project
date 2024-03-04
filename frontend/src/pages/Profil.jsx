import React from "react";
import "../styles/Profil.scss";
import { ProfileProvider } from "../components/profilcomponents/ProfileContext";
import ProfilContainer from "../components/profilcomponents/ProfilContainer"; // Importez ProfilContainer
import NavBar from "../components/Navbar";
import { ModalProvider } from "../contexts/ConnexionContext";

function Profil() {
  return (
    <ModalProvider>
      <NavBar />
      <ProfileProvider>
        <div className="profil-page">
          <ProfilContainer />{" "}
          {/* Ceci inclut MenuProfil et le contenu conditionnel */}
        </div>
      </ProfileProvider>
    </ModalProvider>
  );
}

export default Profil;
