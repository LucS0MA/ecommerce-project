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

  // on utilise le Useeffect pour excuter le code au montage du composant
  // ici on fait une requête GET pour récupérer les données de l'utilisateur depuis la BDD

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3310/api/utilisateurs/0", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      })
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
        // on met a jout l'etat de 'formData' avec les données fournies par l'utilisateur au préalable
        setFormData({
          nom: nom || "",
          prénom: prénom || "",
          email: email || "",
          adresse1: adresse1 || "",
          adresse2: adresse2 || "",
          codePostal: CP || "",
          ville: ville || "",
          pays: pays || "",
          telephone: telephone || "",
        });
      })
      .catch((error) =>
        console.error(
          "Erreur lors du chargement des données de l'utilisateur:",
          error
        )
      );
  }, []); // le tableau de dépendances vide signifie que cet effet va se faire une seule fois

  // la on va gérer les changements avec le HandleInputChange
  // on met à jour 'formData' avec les nouvelles valeurs saisies par l'utilisateur
  const handleInputChange = (event) => {
    const { name, value } = event.target; // on recupern le nom et la valeur de l'élément de formulaire modifié
    setFormData((prevFormData) => ({
      ...prevFormData, // Copie de l'état précédent.
      [name]: value, // Mise à jour de la propriété modifiée. Ex : si on modifie le nom on met à jour la propriété nom
    }));
  };

  // on va gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault(); // on empêche le comportement par défaut du formulaire
    try {
      await axios.put("http://localhost:3310/api/utilisateurs/0", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      }); // on fait une requete PUT pour mettre à jour les données de l'utilisateur dans la bdd
      console.info(formData);
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
        <div className="line-user-info" />
        {subSectionActive === "infos" && (
          <form className="user_form_info" onSubmit={handleSubmit}>
            <div className="first-last-name-input">
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
              name="telephone"
              id="telephone"
              className="inputs-info input-phone-info"
              value={formData.telephone}
              onChange={handleInputChange}
              required
            />
            <div className="submit-container">
              <button className="button-info-send" type="submit">
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
