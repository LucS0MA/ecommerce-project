import React from "react";
import { useAdmin } from "../../contexts/AdminContext";
import ArticlesAdmin from "./ArticlesAdmin";
import CommandesAdmin from "./CommandesAdmin";
import FooterBis from "../FooterBis";
import MenuProfil from "./MenuAdmin";
import Navbar from "../Navbar";
import "../../styles/AdminContent.scss";

function AdminContent() {
  const { activeSection } = useAdmin();
  console.info("Ce qui est selectionné", activeSection);

  let content;
  switch (activeSection) {
    case "AdminCatalogue":
      content = <ArticlesAdmin />;
      break;
    case "CommandesAdmin":
      content = <CommandesAdmin />;
      break;
    //  ici faudra ajouter d'autres composants
    default:
      content = <div>Composant en attente de Dev'</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container-admin">
        <MenuProfil />
        {content}
      </div>
      <FooterBis />
    </>
  );
}

export default AdminContent;
