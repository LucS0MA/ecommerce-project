const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const articlesControllers = require("./controllers/articlesControllers");
const utilisateursControllers = require("./controllers/utilisateursControllers");
const validateUser = require("./middlewares/validateUser");
const fesitvalsControllers = require("./controllers/festivalsControllers");
const isFav = require("./controllers/FavControllers");
const panier = require("./controllers/panierControllers");
const userIdToken = require("./middlewares/userIdToken");

/* ************************************************************************* */

// PUBLIC
// routes utilisateurs
router.post("/utilisateurs", validateUser, utilisateursControllers.add);
router.post("/auth/login", utilisateursControllers.login);

// toutes festivals
router.get("/festivals", fesitvalsControllers.browse);
router.get("/festivals/:id", fesitvalsControllers.read);

// routes articles
router.get("/articles", articlesControllers.browse);
router.get("/articles/:id", articlesControllers.read);

// ----- UTILISATEUR -----
router.use(userIdToken);

// routes utilisateurs
router.get("/utilisateurs/:id", utilisateursControllers.read);
router.put("/utilisateurs/:id", utilisateursControllers.edit);
router.delete("/utilisateurs/:id", utilisateursControllers.destroy);
router.put(
  "/utilisateurs/change-password",
  userIdToken,
  utilisateursControllers.changePassword
);

// routes fav
router.get("/isFav", isFav.read);
router.get("/isFav/:id", isFav.browse);
router.post("/isFav", isFav.add);
router.delete("/isFav", isFav.destroy);

// routes panier
router.get("/panier", panier.read);
router.get("/panier/:id", panier.browse);
router.post("/panier", panier.add);
router.delete("/panier", panier.destroy);
router.put("/panier", panier.edit);

// ----- ADMIN -----
// router.use(isAdmin);

// route utilisateurs
router.get("/utilisateurs", utilisateursControllers.browse);

// routes articles
router.post("/articles", articlesControllers.add);
router.put("/articles/:id", articlesControllers.edit);
router.delete("/articles/:id", articlesControllers.destroy);

// route festivals
router.post("/festivals", fesitvalsControllers.add);

module.exports = router;
