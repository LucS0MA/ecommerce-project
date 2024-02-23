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

  return (
    <div className="informations-paiement-container">
      <div className="card-container">
        <div className="carte-paiement-container">
          <div className="carte-nom">{cardInfo.nom}</div>
          <div className="carte-numero">
            {cardInfo.numero.replace(/.(?=.{4})/g, ".")}
          </div>
          <div className="carte-expiration">{cardInfo.expiration}</div>
        </div>

        <div className="buttons-card">
          <button className="bouton" type="button">
            Supprimer cette carte{" "}
            {/* on devra placer notre logique de la bdd ici */}
          </button>
          <button className="bouton" type="button">
            Ajouter une nouvelle carte {/* pareil pour l'ajout */}
          </button>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={cardInfo.nom}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="numero">Numéro de la carte</label>
        <input
          type="text"
          id="numero"
          name="numero"
          value={cardInfo.numero}
          maxLength={16}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="expiration">Date d'expiration</label>
        <input
          type="text"
          id="expiration"
          name="expiration"
          value={cardInfo.expiration}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="cvv">CVV / CCV</label>
        <input
          type="password"
          id="cvv"
          name="cvv"
          value={cardInfo.cvv}
          onChange={handleInputChange}
        />
      </div>
      <button type="button" className="sauvegarder-btn">
        Sauvegarder
      </button>
    </div>
  );
}

export default UserCreditCard;
