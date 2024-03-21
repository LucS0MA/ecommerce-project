import axios from "axios";
import React, { useEffect, useState } from "react";

import FooterBis from "../components/FooterBis";
import { ModalProvider } from "../contexts/ConnexionContext";
import NavBar from "../components/Navbar";

import "../styles/Admin.scss";

function Admin() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [addArticleIsOpen, setAddArticleIsOpen] = useState(false);
  // Initialisation de la state stockant l'image
  const [file, setFile] = useState();
  // Initialisation des states du formulaire
  const [formData, setFormData] = useState({
    name: "",
    creatrice: "",
    price: "",
    bijoux: false,
    deco: false,
    illustration: false,
    vetement: false,
    accessoire: false,
    thematique: "",
    file: null,
  });
  // Initialisation des states à envoyer dans le Back pour créer le nouvel article
  const [body, setBody] = useState({});
  const [filePath, setFilePath] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/articles/?nom=${search}%&${sort}`)
      .then((response) => setArticles(response.data))
      .catch((err) => console.error(err));
  }, [search, sort]);

  const handleChange = (e) => {
    const { id, type, name, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name || id]: newValue,
    }));
  };

  const handleUpload = () => {
    // On créait un Formulaire
    const newArticleData = new FormData();

    // On ajoute l'image dans la state
    formData.file = file;

    // On parcoure la state et on ajoute ses données dans le Formulaire
    for (const key in formData) {
      if (formData[key]) {
        newArticleData.append(key, formData[key]);
      }
    }

    // On envoie l'image dans le Back et on récupère les données du Formulaire
    axios
      .post("http://localhost:3310/upload", newArticleData)
      .then((response) => {
        setBody(response.data.body);
        setFilePath(`/static/${response.data.file.filename}`);
      })
      .catch((err) => console.error(err));

    // On envoie les données du Formulaire dans le Back
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "http://localhost:3310/api/articles/",
        {
          nom: body.name,
          image: filePath,
          prix: body.price,
          vendeuse: body.creatrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
          },
        }
      )
      .catch((err) => console.error(err));
  };

  return (
    <ModalProvider>
      {/* Modal d'ajout d'article */}
      {addArticleIsOpen && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setAddArticleIsOpen(false)}
            id="admin-backdrop"
          />
          <div id="addArticle">
            <form>
              <div id="admin-modal-left">
                <label htmlFor="name">NOM DU PRODUIT</label>
                <input
                  value={formData.name}
                  onChange={handleChange}
                  id="name"
                  type="text"
                />
                <label htmlFor="creatrice">CREATRICE</label>
                <select
                  value={formData.creatrice}
                  onChange={handleChange}
                  id="creatrice"
                >
                  <option value="">---</option>
                  <option value="Dahlia">Dahlia</option>
                  <option value="Doireann">Doireann</option>
                  <option value="Achlys">Achlys</option>
                  <option value="Elya">Elya</option>
                </select>
                <label htmlFor="price">PRIX</label>
                <div id="admin-modal-price">
                  <input
                    value={formData.price}
                    onChange={handleChange}
                    id="price"
                    type="number"
                  />
                  <p>€</p>
                </div>
                <h2>TYPES</h2>
                <div className="admin-ligne" />
                <div id="admin-modal-types">
                  <input
                    value={formData.bijoux}
                    onChange={handleChange}
                    id="bijoux"
                    type="checkbox"
                  />
                  <label htmlFor="bijoux">BIJOUX</label>
                  <input
                    value={formData.deco}
                    onChange={handleChange}
                    id="deco"
                    type="checkbox"
                  />
                  <label htmlFor="deco">DECORATION</label>
                  <input
                    value={formData.illustration}
                    onChange={handleChange}
                    id="illustration"
                    type="checkbox"
                  />
                  <label htmlFor="illustration">ILLUSTRATION</label>
                  <input
                    value={formData.vetement}
                    onChange={handleChange}
                    id="vetement"
                    type="checkbox"
                  />
                  <label htmlFor="vetement">VETEMENT</label>
                  <input
                    value={formData.accessoire}
                    onChange={handleChange}
                    id="accessoire"
                    type="checkbox"
                  />
                  <label htmlFor="accessoire">ACCESSOIRE</label>
                </div>
              </div>
              <div id="admin-modal-right">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <h2>THEMATIQUES</h2>
                <div className="admin-ligne" />
                <div id="admin-modal-thematiques">
                  <input
                    value="steampunk"
                    checked={formData.thematique === "steampunk"}
                    onChange={handleChange}
                    id="steampunk"
                    type="radio"
                    name="thematique"
                  />
                  <label htmlFor="steampunk">STEAMPUNK</label>
                  <input
                    value="fantasy"
                    checked={formData.thematique === "fantasy"}
                    onChange={handleChange}
                    id="fantasy"
                    type="radio"
                    name="thematique"
                  />
                  <label htmlFor="fantasy">FANTASY</label>
                  <input
                    value="medieval"
                    checked={formData.thematique === "medieval"}
                    onChange={handleChange}
                    id="medieval"
                    type="radio"
                    name="thematique"
                  />
                  <label htmlFor="medieval">MEDIEVAL</label>
                  <input
                    value="magie"
                    checked={formData.thematique === "magie"}
                    onChange={handleChange}
                    id="magie"
                    type="radio"
                    name="thematique"
                  />
                  <label htmlFor="magie">MAGIE</label>
                  <input
                    value="feerie"
                    checked={formData.thematique === "feerie"}
                    onChange={handleChange}
                    id="feerie"
                    type="radio"
                    name="thematique"
                  />
                  <label htmlFor="feerie">FEERIE</label>
                  <input
                    value="cottage"
                    checked={formData.thematique === "cottage"}
                    onChange={handleChange}
                    id="cottage"
                    type="radio"
                    name="thematique"
                  />
                  <label htmlFor="cottage">COTTAGE CORE</label>
                </div>
                <button type="button" onClick={handleUpload}>
                  AJOUTER
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      <NavBar />
      <section id="admin-catalogue">
        <h2>ARTICLES</h2>
        <button type="button" onClick={() => setSort("phares=desc")}>
          LES PLUS VENDUS
        </button>
        <button type="button" onClick={() => setSort("phares=asc")}>
          LES MOINS VENDUS
        </button>
        <button
          type="button"
          onClick={() => setSort("price=asc")}
          className="noborder"
        >
          PRIX CROISSANT
        </button>
        <button
          type="button"
          onClick={() => setSort("price=desc")}
          className="noborder"
        >
          PRIX DECROISSANT
        </button>
        <section id="admin-articles-list">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Rechercher un article"
            type="text"
            name="search"
            id="search"
          />
          <button type="button" onClick={() => setAddArticleIsOpen(true)}>
            <span>+</span> AJOUTER UN ARTICLE
          </button>
          {/* Liste des articles présents dans le catalogue */}
          <div id="admin-list">
            {articles.map((article) => (
              <div style={{ display: "flex", marginTop: "50px" }}>
                <aside>
                  <img
                    src={`http://localhost:3310${article.image}`}
                    alt={article.nom}
                  />
                </aside>
                <article
                  style={{
                    textAlign: "center",
                    alignSelf: "center",
                    marginLeft: "50px",
                  }}
                >
                  <p>PRIX : {article.prix}</p>
                  <p>DATE D'AJOUT : {article.ajout_date}</p>
                  <p>NB VENTE(S) : {article.nb_ventes}</p>
                </article>
              </div>
            ))}
          </div>
        </section>
      </section>
      <FooterBis />
    </ModalProvider>
  );
}

export default Admin;
