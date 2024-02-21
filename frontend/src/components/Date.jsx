import "../styles/Date.scss";
import Loca from "../assets/Layer 10.png";

function Date() {
  return (
    <body>
      <div className="containerD">
        <div className="dateD">
          <p className="numberD">12</p>
          <p className="numberD">-</p>
          <p className="numberD">13</p>
          <p className="boldD">JUIN</p>
          <p className="numberD">2024</p>
        </div>
        <div className="lineD" />
        <div className="locaD">
          <p className="placeD">Médiéval de Mecquignies</p>
          <div className="adressD">
            <img src={Loca} alt="localisation" className="logoD" />
            <p className="textD">
              Mecquignies / Hauts-de-France / France MECQUIGNIES 59570 - Impasse
              du Culot
            </p>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Date;
