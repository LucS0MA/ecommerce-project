import { useState } from "react";
import axios from "axios";
import { useConnexionContext } from "../contexts/ConnexionContext";
import "../styles/Connexion.scss";
import flower from "../assets/Group 19.png";

function Connexion() {
  const { modal, modalTwo, closeModal, toggleModalTwo } = useConnexionContext();
  const [emailReg, setEmailReg] = useState("");
  const [emailCo, setEmailCo] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [passwordCo, setPasswordCo] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);
  const [authentification, setAuthentification] = useState(false);

  const handleSubmitCo = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3310/api/auth/login", {
        email: emailCo,
        password: passwordCo,
      })
      .then((response) => {
        setAuthentification(true);
        console.info(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeAccountCreated = () => {
    setAccountCreated(false);
  };

  const handleInputReg = (e) => {
    if (e.target.id === "email") {
      setEmailReg(e.target.value);
    } else if (e.target.id === "passwordLog") {
      setPasswordReg(e.target.value);
    } else if (e.target.id === "passwordConfirmation") {
      const confirmation = e.target.value;
      setPasswordConfirmation(confirmation);
      setPasswordError(passwordReg !== confirmation);
    }
  };

  const handleSubmitReg = (e) => {
    e.preventDefault();

    if (passwordReg === passwordConfirmation) {
      axios
        .post("http://localhost:3310/api/utilisateurs", {
          email: emailReg,
          password: passwordReg,
        })
        .then(() => {
          setEmailCo("");
          setPasswordCo("");
          setAccountCreated(true);
        });
      // console.log("Email :", emailReg, "Password :", passwordReg);
    } else {
      setPasswordError(true);
    }
  };

  if (modal) {
    document.body.classList.add("active-modalCo");
  } else {
    document.body.classList.remove("active-modalCo");
  }

  if (modalTwo) {
    document.body.classList.add("active-modalTwoCo");
  } else {
    document.body.classList.remove("active-modalTwoCo");
  }

  return (
    <>
      {modal && (
        <div className="modalCo">
          <div
            onClick={closeModal}
            onKeyDown=""
            tabIndex={0}
            role="button"
            className="overlayCo"
            aria-label="Close Modal"
          />
          <div
            className={`borderCo1 ${authentification ? "borderCo1Success" : "borderCo1"}`}
          />
          <div className="modal-contentCo">
            <div className="borderCo">
              {authentification ? (
                ""
              ) : (
                <h2 className="titleCo">SE CONNECTER</h2>
              )}
              <div className="modalContainerCo">
                {authentification ? (
                  <h3 className="AuthSuccess">Connexion réussie !</h3>
                ) : (
                  <>
                    <img className="flowerCo" src={flower} alt="" />
                    <form className="formCo" onSubmit={handleSubmitCo}>
                      <div>
                        <label className="labelHidden" htmlFor="email">
                          Email
                        </label>
                        <input
                          className="inputCo"
                          placeholder="Email"
                          type="email"
                          id="emailCo"
                          value={emailCo}
                          onChange={(e) => setEmailCo(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="labelHidden" htmlFor="password">
                          Mdp
                        </label>
                        <input
                          className="inputCo"
                          placeholder="Mot de passe"
                          type="password"
                          id="passwordCo"
                          value={passwordCo}
                          onChange={(e) => setPasswordCo(e.target.value)}
                          required
                        />
                      </div>
                      <p className="forgotCo">Mot de passe oublié ?</p>
                      <button className="buttonCo" type="submit">
                        Se connecter
                      </button>
                    </form>
                    <div className="ligneCo" />
                    <p className="noAcc">
                      Pas encore de compte ?{" "}
                      <span
                        onClick={toggleModalTwo}
                        className="noAccountCo"
                        onKeyDown=""
                        tabIndex={0}
                        role="button"
                      >
                        Crée ton compte
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {modalTwo && (
        <div className="modalCo">
          <div
            onClick={() => {
              closeModal();
              closeAccountCreated();
            }}
            className="overlayCo"
            onKeyDown=""
            tabIndex={0}
            role="button"
            aria-label="Close Modal"
          />
          <div className="borderCo1Bis" />
          <div className="modal-contentCo">
            <div className="borderCoBis">
              <h2 className="titleCoBis">CREER UN COMPTE</h2>
              <div className="modalContainerCo">
                <img className="flowerCoBis" src={flower} alt="" />
                <form className="formCoBis" onSubmit={handleSubmitReg}>
                  <div>
                    <label className="labelHidden" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="inputCoBis"
                      onClick={closeAccountCreated}
                      placeholder="Email"
                      type="email"
                      id="email"
                      onChange={handleInputReg}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelHidden" htmlFor="password">
                      Mot de passe
                    </label>
                    <input
                      className="inputCoBis"
                      placeholder="Mot de passe"
                      onClick={closeAccountCreated}
                      type="password"
                      id="passwordLog"
                      onChange={handleInputReg}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelHidden" htmlFor="password">
                      Confirmation du mot de passe
                    </label>
                    <input
                      className="inputCoBis"
                      placeholder="Confirmation du mot de passe"
                      onClick={closeAccountCreated}
                      type="password"
                      id="passwordConfirmation"
                      onChange={(e) => handleInputReg(e)}
                      required
                    />
                  </div>
                  {passwordError && (
                    <p className="error">
                      Les mots de passe ne correspondent pas.
                    </p>
                  )}
                  {accountCreated && (
                    <p className="success">
                      Merci, votre compte à bein été créé.
                    </p>
                  )}
                  <button className="buttonCoBis" type="submit">
                    CREÉ LE COMPTE
                  </button>
                  <p className="noAcc">
                    Vous avez déjà un compte ?{" "}
                    <span
                      onClick={toggleModalTwo}
                      className="noAccountCo"
                      onKeyDown=""
                      tabIndex={0}
                      role="button"
                    >
                      Connectez vous
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Connexion;
