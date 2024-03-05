import React, { useState, useEffect } from "react";
import axios from "axios";
import { useProfile } from "./ProfileContext";
import UserCreditCard from "./UserCreditCard";
import "../../styles/UserInfos.scss";

function UserInfos() {
  const { subSectionActive, switchSubSection } = useProfile();

  // Initialisation de l'état formData
  const [formData, setFormData] = useState({
    nom: "",
    prénom: "",
    email: "",
    adresse1: "",
    adresse2: "",
    codePostal: "",
    ville: "",
    pays: "",
    telephone: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/utilisateurs/2")
      .then((response) => {
        const {
          nom,
          prénom,
          email,
          adresse1,
          adresse2,
          CP,
          ville,
          pays,
          telephone,
        } = response.data;
        setFormData({
          nom,
          prenom: prénom,
          email,
          adresse1,
          adresse2,
          codePostal: CP, // Assurez-vous que la clé correspond à votre modèle de données
          ville,
          pays,
          telephone,
        });
      })
      .catch((error) =>
        console.error(
          "Erreur lors du chargement des données de l'utilisateur:",
          error
        )
      );
  }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une fois après le premier rendu

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
      // Utilisation de PUT pour une mise à jour, avec l'ID de l'utilisateur dans l'URL
      await axios.put("http://localhost:3110/api/utilisateurs/2", formData);
      console.info("Mise à jour réussie");
      // Réinitialiser le formulaire ou effectuer d'autres opérations après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", error);
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
                id="prénom"
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
              id="telephone"
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
