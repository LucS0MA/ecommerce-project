import React from "react";
import PropTypes from "prop-types";
import "../styles/MenulProfil.scss";

const sections = [
  { key: "MesInformations", label: "Mes Informations" },
  { key: "ChangerMonMotDePasse", label: "Changer Mon Mot De Passe" },
  { key: "MesFavoris", label: "Mes Favoris" },
  { key: "HistoriqueDesCommandes", label: "Historique Des Commandes" },
  { key: "SupprimerMonCompte", label: "Supprimer Mon Compte" },
];

function MenuProfil({ sectionActive, setSectionActive }) {
  const handleKeyDown = (event, newSection) => {
    if (["Enter", " "].includes(event.key)) {
      setSectionActive(newSection);
    }
  };

  const menuItems = sections.map((section) => (
    <div
      key={section.key}
      className={`item-menu ${sectionActive === section.key ? "actif" : ""}`}
      onClick={() => setSectionActive(section.key)}
      onKeyDown={(event) => handleKeyDown(event, section.key)}
      role="button"
      tabIndex={0}
    >
      {section.label}
    </div>
  ));

  return (
    <div className="menu_profil_container">
      <div className="menu_profil_title">Profil</div>

      <div className="menu_profil">{menuItems}</div>
    </div>
  );
}

MenuProfil.propTypes = {
  sectionActive: PropTypes.string.isRequired,
  setSectionActive: PropTypes.func.isRequired,
};

export default MenuProfil;
