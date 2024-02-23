import React, { useState } from "react";
import { useProfile } from "./ProfileContext";
import UserCreditCard from "./UserCreditCard";
import "../../styles/UserInfos.scss";

function UserInfos() {
  const { subSectionActive, switchSubSection } = useProfile();

  // Initialisation de l'état formData
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    adresse1: "",
    adresse2: "",
    codePostal: "",
    ville: "",
    pays: "",
    telephone: "",
  });

  // Définition de la fonction handleInputChange
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Définition de la fonction handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="user-info">
      <div className="tab-buttons">
        <button
          className="tab-button"
          type="button"
          onClick={() => switchSubSection("infos")}
        >
          Informations personnelles
        </button>
        <button
          className="tab-button"
          type="button"
          onClick={() => switchSubSection("paiement")}
        >
          Informations de paiement
        </button>
      </div>
      <div className="content-line" />
      {subSectionActive === "infos" && (
        <form className="user_form_info" onSubmit={handleSubmit}>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            name="nom"
            id="nom"
            value={formData.nom}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            name="prenom"
            id="prenom"
            value={formData.prenom}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="adresse1">Adresse 1</label>
          <input
            type="text"
            name="adresse1"
            id="adresse1"
            value={formData.adresse1}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="adresse2">Adresse 2</label>
          <input
            type="text"
            name="adresse2"
            id="adresse2"
            value={formData.adresse2}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="codePostal">Code Postal</label>
          <input
            type="number"
            name="codePostal"
            id="codePostal"
            value={formData.codePostal}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="ville">Ville</label>
          <input
            type="text"
            name="ville"
            id="ville"
            value={formData.ville}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="pays">Pays</label>
          <input
            type="text"
            name="pays"
            id="pays"
            value={formData.pays}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="telephone">Numéro de téléphone</label>
          <input
            type="tel"
            name="telephone"
            id="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Enregistrer</button>
        </form>
      )}
      {subSectionActive === "paiement" && <UserCreditCard />}{" "}
    </div>
  );
}

export default UserInfos;
