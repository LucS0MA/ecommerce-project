import React, { useState } from "react";
import axios from "axios";
import { useConnexionContext } from "../../contexts/ConnexionContext";

function DeleteAccount() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [accountDeleted, setAccountDeleted] = useState(false);
  const { logout } = useConnexionContext();

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:3310/api/utilisateurs/delete",
        { actualPassword: password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPassword("");
      setPasswordError("");
      setAccountDeleted(true);
      logout();
    } catch (error) {
      console.info("Error");
      setPasswordError("Erreur dans la suppression du compte");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main>
      <h3 className="TitleDel">Supprimer le compte</h3>
      <form className="deleteForm" onSubmit={handleDeleteAccount}>
        <label className="labelPassDel" htmlFor="password">
          Mot de passe :
        </label>
        <input
          className="passwordValidDelete"
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="ButtDelAcc">
          Supprimer le compte
        </button>
        {passwordError && <div className="error-message">{passwordError}</div>}
        {accountDeleted && (
          <div className="success-message">Compte supprimé avec succès.</div>
        )}
      </form>
    </main>
  );
}

export default DeleteAccount;
