import PropTypes from "prop-types";
import "../styles/Date.scss";
import Loca from "../assets/Layer 10.png";

function Date({ nom, lieu, date }) {
  if (!date || !nom || !lieu) {
    return <div className="containerD" style={{ opacity: 0 }} />;
  }

  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const dateWords = date.split(" ");
  const formattedDate = [];
  dateWords.forEach((word, index) => {
    const lowerCaseWord = word.toLowerCase();
    const isMonth = months.includes(lowerCaseWord);
    const key = `${word}-${index}`;
    formattedDate.push(
      isMonth ? (
        <span key={key} className="month">
          {word}
        </span>
      ) : (
        word
      )
    );
    if (index < dateWords.length - 1) {
      formattedDate.push(" ");
    }
  });
  return (
    <div className="containerD">
      <div className="dateD">
        <p className="numberD">{formattedDate}</p>
      </div>
      <div className="lineD" />
      <div className="locaD">
        <p className="placeD">{nom}</p>
        <div className="adressD">
          <img src={Loca} alt="localisation" className="logoD" />
          <p className="textD">{lieu !== null ? lieu : "Lieu non spécifié"}</p>
        </div>
      </div>
    </div>
  );
}

Date.propTypes = {
  nom: PropTypes.string,
  lieu: PropTypes.string,
  date: PropTypes.string,
};

Date.defaultProps = {
  nom: "Nom non spécifié",
  date: "Date non spécifiée",
  lieu: null,
};

export default Date;
