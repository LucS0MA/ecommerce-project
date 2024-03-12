import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/UserPassword.scss";

function UserChangePassword() {
  const [passwordFields, setPasswordFields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordError, setPasswordError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [oldPasswordFromDB, setOldPasswordFromDB] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const toggleShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/utilisateurs/1`)
      .then((response) => {
        const { password } = response.data;
        console.info("Mot de passe : ", password);
        setOldPasswordFromDB(password);
      })
      .catch((error) => {
        console.error(
          "Erreur lors du chargement des données de l'utilisateur:",
          error
        );
      });
  }, []);

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 0) strength += 1;
    if (password.length >= 8) strength += 1;
    if (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[#$@!%*?&]/.test(password)
    ) {
      strength += 1;
    }
    return strength;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
    setPasswordError("");
    setOldPasswordError("");
    setUpdateSuccess(false);
    if (name === "newPassword" || name === "confirmPassword") {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwordFields;
    if (oldPassword !== oldPasswordFromDB) {
      setOldPasswordError("L'ancien mot de passe est incorrect.");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@!%&*?]{8,15}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Le nouveau mot de passe doit respecter le format requis."
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (newPassword === oldPassword) {
      setPasswordError(
        "Le nouveau mot de passe doit être différent de l'ancien."
      );
      return;
    }

    axios
      .put(`http://localhost:3310/api/utilisateurs/1`, {
        password: newPassword,
      })
      .then(() => {
        setUpdateSuccess(true);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du mot de passe:", error);
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Mot de passe</h2>
      <div className="line-user-info" />
      <div className="password-input-container">
        <input
          type={showPassword.oldPassword ? "text" : "password"}
          name="oldPassword"
          placeholder="Ancien mot de passe"
          value={passwordFields.oldPassword}
          onChange={handleInputChange}
          autoComplete="current-password"
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => toggleShowPassword("oldPassword")}
        >
          Voir
        </button>
      </div>
      {oldPasswordError && <div>{oldPasswordError}</div>}

      <div className="password-input-container">
        <input
          type={showPassword.newPassword ? "text" : "password"}
          name="newPassword"
          placeholder="Nouveau mot de passe"
          value={passwordFields.newPassword}
          onChange={handleInputChange}
          autoComplete="new-password"
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => toggleShowPassword("newPassword")}
        >
          Voir
        </button>
      </div>
      <div className="password-secure-indicator">
        {[...Array(3)].map((_, index) => {
          const isActive = index < passwordStrength;
          const key = `strength-bar-${isActive ? "active" : "inactive"}-${index}`;
          return (
            <div
              key={key}
              className={`secure-bar ${isActive ? "active" : ""}`}
            />
          );
        })}
      </div>

      <div className="password-input-container">
        <input
          type={showPassword.confirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirmer nouveau mot de passe"
          value={passwordFields.confirmPassword}
          onChange={handleInputChange}
          autoComplete="new-password"
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => toggleShowPassword("confirmPassword")}
        >
          Voir
        </button>
      </div>
      {passwordError && <div>{passwordError}</div>}

      <button className="button-psw-send" type="submit">
        Changer le mot de passe
      </button>

      {updateSuccess && <div>Mise à jour de votre mot de passe effectuée.</div>}
    </form>
  );
}

export default UserChangePassword;
