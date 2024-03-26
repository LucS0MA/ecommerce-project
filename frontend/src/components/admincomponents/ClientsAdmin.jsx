import axios from "axios";
import { useState, useEffect } from "react";
import "../../styles/ClientsAdmin.scss";

function ClientsAdmin() {
  const [clientsList, setClientsList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(`http://localhost:3310/api/clients`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      })
      .then((response) => setClientsList(response.data))
      .catch((err) => console.error(err));
  }, []);

  const sortByOrders = () => {
    if (isFiltered === false) {
      const sortCommands = clientsList.sort(
        (a, b) => b.nombre_de_commandes - a.nombre_de_commandes
      );
      setClientsList(sortCommands);
      setIsFiltered(true);
    }

    if (isFiltered === true) {
      setClientsList(clientsList.sort((a, b) => a.id - b.id));
      setIsFiltered(false);
    }
  };

  return (
    <div className="clients-list-main-container">
      <h2>LISTE DES CLIENTS</h2>
      <section className="clients-list-container">
        <div className="filters-clients-list">
          <button type="button" onClick={sortByOrders}>
            {isFiltered ? "ANNULER LE FILTRE" : "TRIER PAR CLIENT FIDELE"}
          </button>
          <input
            className="input_search"
            type="search"
            placeholder="rechercher un article"
          />
        </div>
        <div className="clients-list-array-labels">
          <ul>
            <li>NOM DU CLIENT</li>
            <li>PRENOM</li>
            <li>NOMBRE DE COMMANDES</li>
            <li>DATE D'INSCRIPTION</li>
          </ul>
          <div className="clients-list-details">
            {clientsList.map((client) => (
              <ul key={client.id}>
                <li>{client.nom}</li>
                <li>{client.prénom}</li>
                <li>{client.nombre_de_commandes}</li>
                <li>01/01/2021</li>
              </ul>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientsAdmin;
