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
          <Date />
          <Date />
        </div>
      </div>
    </body>
  );
}

export default Festival;
