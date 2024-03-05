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
      <button className="button-psw-send" type="button">
        Changer le mot de passe
      </button>
    </form>
  );
}

UserChangePassword.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default UserChangePassword;
