import { useState } from "react";
import MenuProfil from "../components/MenuProfil";

// Importez également d'autres composants que vous pourriez utiliser sur cette page

function Profil() {
  const [sectionActive, setSectionActive] = useState("MesInformations");

  return (
    <div className="profil-page">
      <MenuProfil
        sectionActive={sectionActive}
        setSectionActive={setSectionActive}
      />
    </div>
  );
}

export default Profil;
