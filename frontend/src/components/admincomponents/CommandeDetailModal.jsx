import React from "react";
import PropTypes from "prop-types";

function CommandeDetailsModal({ isOpen, onClose, commandeDetails }) {
  if (!isOpen) return null;
  console.info("Props reçues par CommandeDetailsModal:", {
    isOpen,
    commandeDetails,
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Détails de la commande Nr : {commandeDetails.id}</h2>
        <p>Date et heure: {commandeDetails.date}</p>
        {commandeDetails.articles.map((article) => (
          <div key={`${article.nom}-${article.quantite}`}>
            <p>{article.nom}</p>
            <p>Prix unitaire : {article.prix} €</p>
            <p>Quantité: {article.quantite}</p>
          </div>
        ))}
        <p>Total de la commande: {commandeDetails.total} €</p>
        <button type="button" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
}

// Définissez les PropTypes pour votre composant
CommandeDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  commandeDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        nom: PropTypes.string.isRequired,
        prix: PropTypes.number.isRequired,
        quantite: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CommandeDetailsModal;
