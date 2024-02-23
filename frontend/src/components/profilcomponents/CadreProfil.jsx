import React, { useState } from "react";
import PropTypes from "prop-types";
import Cadre from "./Cadre";
import UserInfos from "./UserInfos";
import UserPassword from "./UserPassword";

// Ajoutez la prop sectionActive à CadreProfil
function CadreProfil({ sectionActive }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    adresse1: "",
    adresse2: "",
    ville: "",
    codePostal: "",
    pays: "",
    telephone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.info("Submitted Data:", formData);
  };

  // Utilisez la prop sectionActive pour conditionner le contenu affiché
  return (
    <Cadre>
      {/* Conditionnez le contenu basé sur sectionActive plutôt que tabActive */}
      {sectionActive === "MesInformations" && (
        <UserInfos
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
      {sectionActive === "ChangerMonMotDePasse" && (
        <UserPassword
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
      {/* Vous pouvez ajouter d'autres conditions pour d'autres sections si nécessaire */}
    </Cadre>
  );
}
CadreProfil.propTypes = {
  sectionActive: PropTypes.string.isRequired, // Déclarez que sectionActive est une prop requise de type string
};

export default CadreProfil;
