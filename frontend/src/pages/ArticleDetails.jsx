import React from "react";
import "../styles/Profil.scss";
import DetailArticle from "../components/DetailArticle";
import NavBar from "../components/Navbar";
import { ModalProvider } from "../contexts/ConnexionContext";
import FooterBis from "../components/FooterBis";
import Connexion from "../components/Connexion";

function ArticleDetails() {
  return (
    <ModalProvider>
      <NavBar />
      <Connexion />
      <DetailArticle />
      <FooterBis />
    </ModalProvider>
  );
}

export default ArticleDetails;
