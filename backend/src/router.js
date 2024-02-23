const express = require("express");
// http://localhost:4242/api/characters

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const articlesControllers = require("./controllers/articlesControllers");
const utilisateursControllers = require("./controllers/utilisateursControllers");
const fesitvalsControllers = require("./controllers/festivalsControllers");
// const moviesControllers = require("./controllers/moviesControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* ************************************************************************* */

router.get("/articles", articlesControllers.browse);
router.get("/articles/:id", articlesControllers.read);
router.post("/articles", articlesControllers.add);
router.put("/articles/:id", articlesControllers.edit);
router.delete("/articles/:id", articlesControllers.destroy);

router.get("/utilisateurs", utilisateursControllers.browse);
router.get("/utilisateurs/:id", utilisateursControllers.read);
router.post("/utilisateurs", utilisateursControllers.add);
router.put("/utilisateurs/:id", utilisateursControllers.edit);
router.delete("/utilisateurs/:id", utilisateursControllers.destroy);

router.get("/festivals", fesitvalsControllers.browse);
router.get("/festivals/:id", fesitvalsControllers.read);
router.post("/festivals", fesitvalsControllers.add);

module.exports = router;
