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

/* ************************************************************************* */

router.get("/articles", articlesControllers.browse);
router.get("/articles/:id", articlesControllers.read);
router.post("/articles", articlesControllers.add);
router.put("/articles/:id", articlesControllers.edit);
router.delete("/articles/:id", articlesControllers.destroy);

router.get("/utilisateurs", utilisateursControllers.browse);
router.get("/utilisateurs/:id", utilisateursControllers.read);
router.post("/utilisateurs", validateUser, utilisateursControllers.add);
router.put("/utilisateurs/:id", utilisateursControllers.edit);
router.delete("/utilisateurs/:id", utilisateursControllers.destroy);
router.post("/auth/login", utilisateursControllers.login);

router.get("/festivals", fesitvalsControllers.browse);
router.get("/festivals/:id", fesitvalsControllers.read);
router.post("/festivals", fesitvalsControllers.add);

router.get("/isFav", isFav.read);
router.get("/isFav/:id", isFav.browse);
router.post("/isFav", isFav.add);
router.delete("/isFav", isFav.destroy);

module.exports = router;
