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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4242/api/utilisateurs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.info(result);
      } else {
        console.error("Une erreur est survenue lors de l'envoi des données");
      }
    } catch (error) {
      console.error("Une erreur de réseau est survenue", error);
    }
  };

  return (
    <div>
      <div className="user-info">
        <div className="tab-buttons">
          <button
            className={`tab-button ${subSectionActive === "infos" ? "active" : ""}`}
            type="button"
            onClick={() => switchSubSection("infos")}
          >
            Informations personnelles
          </button>
          <button
            className={`tab-button ${subSectionActive === "paiement" ? "active" : ""}`}
            type="button"
            onClick={() => switchSubSection("paiement")}
          >
            Informations de paiement
          </button>
        </div>
        <div className="content-line" />
        {subSectionActive === "infos" && (
          <form className="user_form_info" onSubmit={handleSubmit}>
            <div className="fist-last-name-input">
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
                name="prénom"
                id="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                required
              />
            </div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly
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
            <div className="city-cp-input">
              <label htmlFor="codePostal">Code Postal</label>
              <input
                type="number"
                name="CP"
                id="codePostal"
                value={formData.codePostal}
                onChange={handleInputChange}
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
            </div>
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
              name="telepphone"
              id="phone"
              value={formData.telephone}
              onChange={handleInputChange}
              required
            />
            <div className="submit-container">
              <button type="submit">Enregistrer</button>
            </div>
          </form>
        )}
      </div>
      {subSectionActive === "paiement" && <UserCreditCard />}{" "}
    </div>
  );
}

export default UserInfos;
