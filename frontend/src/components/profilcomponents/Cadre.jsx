import React from "react";
import PropTypes from "prop-types"; // Importez PropTypes
import "../../styles/Cadre.scss";

function Cadre({ children }) {
  return (
    <div>
      <div className="cadre-container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

// Ajout de la validation pour children
Cadre.propTypes = {
  children: PropTypes.node, // 'node' couvre tout ce qui peut être rendu : nombres, chaînes de caractères, éléments ou un array contenant ces types.
};

Cadre.defaultProps = {
  children: null, // Ou une autre valeur par défaut appropriée
};

export default Cadre;
