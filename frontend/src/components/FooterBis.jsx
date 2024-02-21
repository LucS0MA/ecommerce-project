import React from "react";
import "../styles/FooterBis.scss";
import Icon from "../assets/seelieF.png";
import Insta from "../assets/instag.png";
import Fb from "../assets/fb.png";
import Tiktok from "../assets/tiktok.png";

function FooterBis() {
  return (
    <section className="footer">
      <div className="footer-column">
        <div className="footer-left">
          <div className="footer-ImgCopy">
            <div className="footer-image">
              <img src={Icon} alt="icon footer" className="footer-Icon" />
            </div>
            <p className="copyRight">
              © 2024 Le Comptoir des Seelies. <br /> All rights reserved to Le
              Comptoir des Seelies
            </p>
          </div>
          <div className="footer-nav">
            <p>ACCEUIL</p>
            <p>CATALOGUE</p>
            <p>À PROPOS</p>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-socials">
            <div className="social-icon">
              <img
                src={Insta}
                alt="Instagram"
                className="footer-socials-icons"
              />
              <span>@LeComptoirDesSeelies</span>
            </div>
            <div className="social-icon">
              <img src={Fb} alt="Facebook" className="footer-socials-icons" />
              <span>@LeComptoirDesSeelies</span>
            </div>
            <div className="social-icon">
              <img src={Tiktok} alt="TikTok" className="footer-socials-icons" />
              <span>@LeComptoirDesSeelies</span>
            </div>
          </div>
          <div className="footer-others">
            <p>Informations Légales</p>
            <p>FAQ</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FooterBis;
