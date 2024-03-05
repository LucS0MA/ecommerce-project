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
        <div className="user-buttons">
          <button
            className={`user-button ${subSectionActive === "infos" ? "active" : ""}`}
            type="button"
            onClick={() => switchSubSection("infos")}
          >
            Informations personnelles
          </button>
          <button
            className={`user-button ${subSectionActive === "paiement" ? "active" : ""}`}
            type="button"
            onClick={() => switchSubSection("paiement")}
          >
            Informations de paiement
          </button>
        </div>
        <div className="content-user-info" />
        {subSectionActive === "infos" && (
          <form className="user_form_info" onSubmit={handleSubmit}>
            <div className="fist-last-name-input">
              <label className="labels-info" htmlFor="nom">
                Nom
              </label>
              <input
                type="text"
                name="nom"
                id="nom"
                className="inputs-info input-name-info"
                value={formData.nom}
                onChange={handleInputChange}
                required
              />
              <label className="labels-info" htmlFor="prenom">
                Prénom
              </label>
              <input
                type="text"
                name="prénom"
                id="prenom"
                className="inputs-info input-firstname-info"
                value={formData.prenom}
                onChange={handleInputChange}
                required
              />
            </div>
            <label className="labels-info" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="inputs-info input-email-info"
              value={formData.email}
              onChange={handleInputChange}
              readOnly
            />
            <label className="labels-info" htmlFor="adresse1">
              Adresse 1
            </label>
            <input
              type="text"
              name="adresse1"
              id="adresse1"
              className="inputs-info input-add1-info"
              value={formData.adresse1}
              onChange={handleInputChange}
              required
            />
            <label className="labels-info" htmlFor="adresse2">
              Adresse 2
            </label>
            <input
              type="text"
              name="adresse2"
              id="adresse2"
              className="inputs-info input-add2-info"
              value={formData.adresse2}
              onChange={handleInputChange}
              required
            />
            <div className="city-cp-input">
              <label className="labels-info" htmlFor="codePostal">
                Code Postal
              </label>
              <input
                type="number"
                name="CP"
                id="codePostal"
                className="inputs-info input-cp-info"
                value={formData.codePostal}
                onChange={handleInputChange}
              />
              <label className="labels-info" htmlFor="ville">
                Ville
              </label>
              <input
                type="text"
                name="ville"
                id="ville"
                className="inputs-info input-city-info"
                value={formData.ville}
                onChange={handleInputChange}
                required
              />
            </div>
            <label className="labels-info" htmlFor="pays">
              Pays
            </label>
            <input
              type="text"
              name="pays"
              id="pays"
              className="inputs-info input-country-info"
              value={formData.pays}
              onChange={handleInputChange}
              required
            />
            <label className="labels-info" htmlFor="telephone">
              Numéro de téléphone
            </label>
            <input
              type="tel"
              name="telepphone"
              id="phone"
              className="inputs-info input-phone-info"
              value={formData.telephone}
              onChange={handleInputChange}
              required
            />
            <div className="submit-container">
              <button className="button-info-send" type="button">
                Enregistrer
              </button>
            </div>
          </form>
        )}
      </div>
      {subSectionActive === "paiement" && <UserCreditCard />}{" "}
    </div>
  );
}

export default UserInfos;
