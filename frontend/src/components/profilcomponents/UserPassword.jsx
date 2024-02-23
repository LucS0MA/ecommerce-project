import React from "react";
import PropTypes from "prop-types";

function UserChangePassword({ handleInputChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        name="oldPassword"
        placeholder="Ancien mot de passe"
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="newPassword"
        placeholder="Nouveau mot de passe"
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirmer nouveau mot de passe"
        onChange={handleInputChange}
      />
      <button type="submit">Changer le mot de passe</button>
    </form>
  );
}

UserChangePassword.propTypes = {
  handleInputChange: PropTypes.func.isRequired, // Assurez-vous que handleInputChange est une fonction et qu'elle est requise
  handleSubmit: PropTypes.func.isRequired, // Si vous utilisez également handleSubmit, assurez-vous de le valider de la même manière
};

export default UserChangePassword;
