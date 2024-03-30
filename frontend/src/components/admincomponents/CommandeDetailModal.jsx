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
        <p>
          <strong>Date et heure:</strong> {commandeDetails.date}
        </p>
        <p>
          <strong>Statut:</strong> {commandeDetails.statut}
        </p>
        {commandeDetails.articles.map((article) => (
          <div key={`${article.nom}-${article.prix}`}>
            <p>
              <strong>Nom:</strong> {article.nom}
            </p>
            <p>
              <strong>Prix unitaire:</strong> {article.prix} €
            </p>
            <p>
              <strong>Quantité:</strong> {article.quantite}
            </p>
          </div>
        ))}
        <p>
          <strong>Total de la commande:</strong>{" "}
          {commandeDetails.total.toFixed(2)} €
        </p>
        <button type="button" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
}

CommandeDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  commandeDetails: PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.string,
    total: PropTypes.number,
    statut: PropTypes.string,
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        nom: PropTypes.string.isRequired,
        prix: PropTypes.number.isRequired,
        quantite: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CommandeDetailsModal;
