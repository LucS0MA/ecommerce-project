import "../../styles/ListeClientsAdmin.scss";

function ListeClientsAdmin() {
  return (
    <div className="clients-list-main-container">
      <h1>LISTE DES CLIENTS</h1>
      <section className="clients-list-container">
        <div className="filters-clients-list">
          <button type="button">TRIER PAR CLIENT FIDELE</button>
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
            <ul>
              <li>Pitt</li>
              <li>Brad</li>
              <li>50</li>
              <li>01/01/2021</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ListeClientsAdmin;
