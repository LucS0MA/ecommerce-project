// import axios from "axios";
// import React, { useEffect, useState } from "react";

// import FooterBis from "../components/FooterBis";
// import { ModalProvider } from "../contexts/ConnexionContext";
// import NavBar from "../components/Navbar";

// import "../styles/Admin.scss";

// function Profil() {
//   const [articles, setArticles] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3310/api/articles/?nom=${search}%&${sort}`)
//       .then((response) => setArticles(response.data))
//       .catch((err) => console.error(err));
//   }, [search, sort]);

//   const addArticle = () => {
//     console.info("ajout");
//   };

//   return (
//     <ModalProvider>
//       <NavBar />
//       <section id="admin-catalogue">
//         <h2>ARTICLES</h2>
//         <button type="button" onClick={() => setSort("phares=desc")}>
//           LES PLUS VENDUS
//         </button>
//         <button type="button" onClick={() => setSort("phares=asc")}>
//           LES MOINS VENDUS
//         </button>
//         <button
//           type="button"
//           onClick={() => setSort("price=asc")}
//           className="noborder"
//         >
//           PRIX CROISSANT
//         </button>
//         <button
//           type="button"
//           onClick={() => setSort("price=desc")}
//           className="noborder"
//         >
//           PRIX DECROISSANT
//         </button>
//         <section id="admin-articles-list">
//           <input
//             onChange={(e) => setSearch(e.target.value)}
//             value={search}
//             placeholder="Rechercher un article"
//             type="text"
//             name="search"
//             id="search"
//           />
//           <button type="button" onClick={() => addArticle()}>
//             <span>+</span> AJOUTER UN ARTICLE
//           </button>
//           <div id="admin-list">
//             {articles.map((article) => (
//               <div style={{ display: "flex", marginTop: "50px" }}>
//                 <aside>
//                   <img
//                     src={`http://localhost:3310${article.image}`}
//                     alt={article.nom}
//                   />
//                 </aside>
//                 <article
//                   style={{
//                     textAlign: "center",
//                     alignSelf: "center",
//                     marginLeft: "50px",
//                   }}
//                 >
//                   <p>PRIX : {article.prix}</p>
//                   <p>DATE D'AJOUT : {article.ajout_date}</p>
//                   <p>NB VENTE(S) : {article.nb_ventes}</p>
//                 </article>
//               </div>
//             ))}
//           </div>
//         </section>
//       </section>
//       <FooterBis />
//     </ModalProvider>
//   );
// }

// export default Profil;

import React from "react";
import { AdminProvider } from "../contexts/AdminContext";
import AdminContent from "../components/admincomponents/AdminContent";
import { ModalProvider } from "../contexts/ConnexionContext";

function Admin() {
  return (
    <ModalProvider>
      <AdminProvider>
        <AdminContent />
      </AdminProvider>
    </ModalProvider>
  );
}

export default Admin;
