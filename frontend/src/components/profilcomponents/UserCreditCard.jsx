import React, { useState } from "react";
import "../../styles/UserCreditCard.scss";

function UserCreditCard() {
  const [cardInfo, setCardInfo] = useState({
    nom: "",
    numero: "",
    expiration: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSaveCard = async () => {
    try {
      const response = await fetch(
        "Url de la requette a voir avec lucien ou metteo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardInfo),
        }
      );

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

  const handleDeleteCard = async () => {
    try {
      const response = await fetch(
        "Url de la requette a voir avec lucien ou metteo",
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.info("Carte supprimée avec succès");
        setCardInfo({ nom: "", numero: "", expiration: "", cvv: "" });
      } else {
        console.error("Erreur lors de la suppression de la carte");
      }
    } catch (error) {
      console.error("Erreur réseau lors de la suppression de la carte", error);
    }
  };

  return (
    <div className="informations-paiement-container">
      <div className="card-container">
        <div className="carte-paiement-container">
          <h1 id="card-title">Carte de crédit</h1>

          <div className="carte-nom">{cardInfo.nom}</div>
          <div className="carte-numero">
            {cardInfo.numero
              .replace(/.(?=.{4})/g, ".")
              .replace(/(.{4})/g, "$1 ")
              .trim()}
          </div>
          <div className="carte-expiration">{cardInfo.expiration}</div>
          <img src="../src/assets/visa.svg" alt="logo carte VISA" />
        </div>

        <div className="buttons-card">
          <button className="bouton" type="button" onClick={handleDeleteCard}>
            Supprimer cette carte{" "}
          </button>
          <button className="bouton" type="button" onClick={handleSaveCard}>
            Ajouter une nouvelle carte
          </button>
        </div>
      </div>

      <div className="input-group">
        <label className="labels-cb" htmlFor="nom">
          Nom
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          className="inputs-cb input-name-cb"
          value={cardInfo.nom}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label className="labels-cb" htmlFor="numero">
          Numéro de la carte
        </label>
        <input
          type="text"
          id="numero"
          name="numero"
          className="inputs-cb input-number-cb"
          value={cardInfo.numero}
          maxLength={16}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label className="labels-cb" htmlFor="expiration">
          Date d'expiration
        </label>
        <input
          type="text"
          id="expiration"
          name="expiration"
          className="inputs-cb input-exp-cb"
          value={cardInfo.expiration}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label className="labels-cb" htmlFor="cvv">
          CVV / CCV
        </label>
        <input
          type="password"
          id="cvv"
          name="cvv"
          className="inputs-cb input-cvv-cb"
          value={cardInfo.cvv}
          onChange={handleInputChange}
          maxLength={3}
        />
      </div>
      <button type="button" className="sauvegarder-btn">
        Sauvegarder
      </button>
    </div>
  );
}

export default UserCreditCard;
