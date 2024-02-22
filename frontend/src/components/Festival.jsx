import "../styles/Festival.scss";
import Date from "./Date";

function Festival() {
  return (
    <body className="festival">
      <div className="festival-container">
        <div className="principal-box">
          <h1>Retrouvez vos sellies et nos Prochains Festivals</h1>
        </div>
        <div className="dates-box">
          <Date
            date="12 - 13 JUIN 2024"
            nom="Médiéval de Mecquignies"
            lieu="Mecquignies / Hauts-de-France / France MECQUIGNIES 59570 - Impasse
              du Culot"
          />
          <Date
            date="16 - 17 NOVEMBRE 2024 "
            nom="LudiGeek Festival"
            lieu="Salle du Manège, 11 Rue Jacquard, 59250 Halluin"
          />
          <Date />
        </div>
      </div>
    </body>
  );
}

export default Festival;
