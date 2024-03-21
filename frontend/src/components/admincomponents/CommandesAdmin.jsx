// Composant a Faire Ceci est juste un test
import React from "react";

function CommandesAdmin() {
  return (
    <div className="orders-container">
      <h1>LES COMMANDES</h1>
      <div className="sorting-buttons">
        <button type="button">TRIER PAR DATES</button>
        <button type="button">TRIER PAR STATUT</button>
        <button type="button">TRIER PAR UTILISATEUR</button>
      </div>
      <div className="search-box">
        <input type="text" placeholder="Rechercher un article" />
        <button type="button">🔍</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>NUMÉRO DE COMMANDE</th>
            <th>DATE</th>
            <th>NOM D'ACHETEUR</th>
            <th>TOTAL DE LA COMMANDE</th>
            <th>NOMBRE D'ARTICLE</th>
            <th>STATUT</th>
          </tr>
        </thead>
        {/* Le corps du tableau viendra ici */}
      </table>
    </div>
  );
}

export default CommandesAdmin;
