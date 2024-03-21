// composant Menu a gauche de la page admin
import React from "react";
import { useAdmin } from "../../contexts/AdminContext";
import "../../styles/MenulProfil.scss";

const sections = [
  { key: "CatalogueAdmin", label: "Catalogue" },
  { key: "CommandesAdmin", label: "Voir les commandes" },
  { key: "ClientsAdmin", label: "Liste clients" },
  { key: "VendeursAdmin", label: "Profil Vendeurs" },
  { key: "EventsAdmin", label: "Gestion des évènements" },
];

function MenuAdmin() {
  const { activeSection, switchSection } = useAdmin();

  const handleKeyDown = (event, sectionKey) => {
    if (event.key === "Enter") {
      console.info("Enter pressed for section:", sectionKey);
      switchSection(sectionKey);
    }
  };

  const menuItems = sections.map((section) => (
    <div
      key={section.key}
      className={`item-menu ${activeSection === section.key ? "actif" : ""}`}
      onClick={() => {
        console.info("Clic sur la section :", section.key);
        switchSection(section.key);
      }}
      onKeyDown={(event) => handleKeyDown(event, section.key)}
      role="button"
      tabIndex={0}
    >
      {section.label}
    </div>
  ));

  return (
    <div className="menu_profil_container">
      <div className="menu_profil_title">Administrateur</div>
      <div className="menu_profil">{menuItems}</div>
    </div>
  );
}

export default MenuAdmin;
