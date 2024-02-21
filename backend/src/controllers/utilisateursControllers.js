// Import access to database tables
const models = require("../modelsProviders");

// The B of BREAD - Browse (Read All) operation
const browse = (req, res) => {
  // Fetch all utilisateurs from the database
  models.utilisateurs
    .findAll()
    .then((utilisateurs) => res.json(utilisateurs))
    .catch((err) => console.error(err));
};

// The R of BREAD - Read operation
const read = async (req, res) => {
  try {
    // Fetch a specific utilisateur from the database based on the provided ID
    const utilisateur = await models.utilisateurs.read(req.params.id);

    // If the utilisateur is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the utilisateur in JSON format
    if (utilisateur == null) {
      res.sendStatus(404);
    } else {
      res.json(utilisateur);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res) => {
  // Extract the utilisateur data from the request body
  const utilisateur = req.body;

  try {
    // Insert the utilisateur into the database
    const insertId = await models.utilisateurs.create(utilisateur);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted utilisateur
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error(err);
  }
};

const edit = async (req, res) => {
  const { id } = req.params.id;
  const utilisateur = req.body;

  try {
    const affectedRows = await models.utilisateurs.update(id, utilisateur);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
  }
};

const destroy = async (req, res) => {
  const { id } = req.params.id;

  try {
    const affectedRows = await models.utilisateurs.delete(id);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
