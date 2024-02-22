import PropTypes from "prop-types";
import "../styles/Date.scss";
import Loca from "../assets/Layer 10.png";

function Date({ nom, lieu, date }) {
  return (
    <body>
      <div className="containerD">
        <div className="dateD">
          <p className="numberD">{date}</p>
        </div>
        <div className="lineD" />
        <div className="locaD">
          <p className="placeD">{nom}</p>
          <div className="adressD">
            <img src={Loca} alt="localisation" className="logoD" />
            <p className="textD">{lieu}</p>
          </div>
        </div>
      </div>
    </body>
  );
}

Date.propTypes = {
  nom: PropTypes.string.isRequired,
  lieu: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Date;
