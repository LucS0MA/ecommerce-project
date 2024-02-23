// Import access to database tables
const models = require("../modelsProviders");

// The B of BREAD - Browse (Read All) operation
const browse = (req, res) => {
  // Fetch all items from the database
  models.articles
    .findAll()
    .then((articles) => res.json(articles))
    .catch((err) => console.error(err));
};

// The R of BREAD - Read operation
const read = async (req, res) => {
  try {
    // Fetch a specific article from the database based on the provided ID
    const article = await models.articles.read(req.params.id);

    // If the article is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the article in JSON format
    if (article == null) {
      res.sendStatus(404);
    } else {
      res.json(article);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res) => {
  // Extract the utilisateur data from the request body
  const article = req.body;

  try {
    // Insert the article into the database
    const insertId = await models.articles.create(article);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted article
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error(err);
  }
};

module.exports = {
  browse,
  read,
  add,
};
