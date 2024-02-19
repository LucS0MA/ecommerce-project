import { useState } from "react";
import { useConnexionContext } from "../contexts/ConnexionContext";
import "../styles/Connexion.scss";
import flower from "../assets/Group 19.png";

function Connexion() {
  const { modal, modalTwo, closeModal, toggleModalTwo } = useConnexionContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    // console.log("Email:", email);
    // console.log("Mot de passe:", password);
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    // console.log("Email:", email);
    // console.log("Mot de passe:", password);
    // console.log("Confirmation du mot de passe:", passwordConfirmation);
  };

  if (modal) {
    document.body.classList.add("active-modalCo");
  } else {
    document.body.classList.remove("active-modalCo");
  }

  return (
    <>
      {/* <button type="button" onClick={toggleModal} className="btn-modalCo">
        REGISTER / SIGN IN
      </button> */}
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
          <div className="borderCo1" />
          <div className="modal-contentCo">
            <div className="borderCo">
              <h2 className="titleCo">SE CONNECTER</h2>
              <div className="modalContainerCo">
                <img className="flowerCo" src={flower} alt="" />
                <form className="formCo" onSubmit={handleSubmitRegister}>
                  <div>
                    <label className="labelHidden" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="inputCo"
                      placeholder="Email"
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
              </div>
            </div>
          </div>
        </div>
      )}
      {modalTwo && (
        <div className="modalCo">
          <div
            onClick={closeModal}
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
                <form className="formCoBis" onSubmit={handleSubmitSignUp}>
                  <div>
                    <label className="labelHidden" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="inputCoBis"
                      placeholder="Email"
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelHidden" htmlFor="password">
                      Mdp
                    </label>
                    <input
                      className="inputCoBis"
                      placeholder="Mot de passe"
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelHidden" htmlFor="password">
                      Mdp
                    </label>
                    <input
                      className="inputCoBis"
                      placeholder="Confirmation du mot de passe"
                      type="password"
                      id="passwordConfirmation"
                      value={passwordConfirmation}
                      onChange={(e) => setpasswordConfirmation(e.target.value)}
                      required
                    />
                  </div>
                  <button className="buttonCoBis" type="submit">
                    CREÉ LE COMPTE
                  </button>
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
