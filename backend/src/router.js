const express = require("express");
// http://localhost:4242/api/characters

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const charactersControllers = require("./controllers/charactersControllers");
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
router.get("/characters", charactersControllers.browse);

// Route to get a list articles
router.get("/articles", articlesControllers.browse);

// Route to get a specific article by ID
router.get("/articles/:id", articlesControllers.read);
router.post("/articles", articlesControllers.add);

router.get("/utilisateurs", utilisateursControllers.browse);
router.get("/utilisateurs/:id", utilisateursControllers.read);
router.post("/utilisateurs", utilisateursControllers.add);

router.get("/festivals", fesitvalsControllers.browse);
router.get("/festivals/:id", fesitvalsControllers.read);
router.post("/festivals", fesitvalsControllers.add);

module.exports = router;
