import React, { useState } from "react";
import commandesData from "../../../commandData.json";
import "../../styles/CommandesAdmin.scss";

function CommandesAdmin() {
  const [sortedField, setSortedField] = useState(null);
  const [order, setOrder] = useState("asc");
  const [data, setData] = useState(commandesData);

  function getStatusClass(statut) {
    switch (statut) {
      case "Livrée":
        return "status-delivered";
      case "En préparation":
        return "status-in-preparation";
      case "Annulée":
        return "status-cancelled";
      default:
        return "";
    }
  }

  const sortData = (field) => {
    if (sortedField === field && order === "desc") {
      setSortedField(field);
      setOrder("desc");
    } else {
      setSortedField(field);
      setOrder("asc");
    }

    const sortedArray = [...data].sort((a, b) => {
      if (field === "date") {
        const convertDate = (dateStr) => {
          const [day, month, year] = dateStr.split("/");
          return new Date(`20${year}`, month - 1, day);
        };

        const dateA = convertDate(a[field]);
        const dateB = convertDate(b[field]);

        return (dateA - dateB) * (order === "asc" ? 1 : -1);
      }

      if (a[field] < b[field]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedArray);
  };

  const resetSorting = () => {
    setSortedField(null);
    setOrder("asc");
    setData(commandesData);
  };

  return (
    <div>
      <div className="orders-container">
        <h2 className="tilte-admin-command">Les Commandes</h2>
        <div className="filter-command-buttons">
          <button type="button" onClick={() => sortData("date")}>
            Trier par date
          </button>
          <button type="button" onClick={() => sortData("statut")}>
            Trier par statut
          </button>
          <button type="button" onClick={() => sortData("nomAcheteur")}>
            Trier par utilisateur
          </button>
          <button type="button" onClick={resetSorting}>
            Réinitialiser les filtres
          </button>
        </div>
        <table id="array-command-container">
          <thead id="array-command-title">
            <tr>
              <th>NUMÉRO DE COMMANDE</th>
              <th>DATE</th>
              <th>NOM D'ACHETEUR</th>
              <th>TOTAL DE LA COMMANDE</th>
              <th>NOMBRE D'ARTICLE</th>
              <th>STATUT</th>
            </tr>
          </thead>
          <tbody id="array-command-data">
            {data.map((commande) => (
              <tr key={commande.commandeId}>
                <td>{commande.commandeId}</td>
                <td>{commande.date}</td>
                <td>{commande.nomAcheteur}</td>
                <td>{commande.totalCommande}</td>
                <td>{commande.nombreArticle}</td>
                <td>
                  <span
                    className={`status-diode ${getStatusClass(commande.statut)}`}
                    aria-label={`Statut de la commande: ${commande.statut}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CommandesAdmin;
